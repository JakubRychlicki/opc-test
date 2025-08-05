import { AttributeIds, ClientSession, NodeId, OPCUAClient } from 'node-opcua-client';

export interface CollectedData {
  timestamp: string;
  serverInfo: {
    endpointUrl: string;
    serverState?: {
      startTime?: string;
      currentTime?: string;
      state?: string;
      buildInfo?: any;
      secondsTillShutdown?: number;
    };
  };
  nodes: {
    [key: string]: NodeData;
  };
  variables: VariableData[];
  devices: DeviceInfo[];
}

export interface DeviceInfo {
  nodeId: string;
  deviceName?: string;
  manufacturer?: string;
  model?: string;
  serialNumber?: string;
  hardwareRevision?: string;
  softwareRevision?: string;
  operatingMode?: number;
}

export interface NodeData {
  nodeId: string;
  references: ReferenceData[];
}

interface ReferenceData {
  browseName: string;
  nodeId: string;
  nodeClass: number;
  isForward: boolean;
}

interface VariableData {
  name: string;
  nodeId: string;
  value: any;
  dataType?: any;
  statusCode?: string;
  timestamp?: string;
}

async function browseNode(
  session: ClientSession,
  collectedData: CollectedData,
  nodeId: string | NodeId,
  indent: string = '',
  maxDepth: number = 3,
  currentDepth: number = 0,
): Promise<void> {
  if (currentDepth >= maxDepth) return;

  // log(`${indent}Browsing node: ${nodeId}`);

  try {
    const browseDesc = {
      nodeId: typeof nodeId === 'string' ? NodeId.resolveNodeId(nodeId) : nodeId,
      includeSubtypes: true,
      browseDirection: 0,
      resultMask: 63,
    };

    const browseResult = await session.browse(browseDesc);

    if (!browseResult.references || browseResult.references.length === 0) {
      // log(`${indent}No references found for ${nodeId}`);
      return;
    }

    const nodeData: NodeData = {
      nodeId: nodeId.toString(),
      references: [],
    };

    // Check if this node might be a device
    try {
      const typeDefinition = await session.read({
        nodeId: typeof nodeId === 'string' ? NodeId.resolveNodeId(nodeId) : nodeId,
        attributeId: AttributeIds.NodeClass,
      });

      if (typeDefinition.value?.value === 1) {
        // NodeClass.Object
        const browseName = browseResult.references[0]?.browseName?.name?.toString() || 'Unknown';
        const deviceInfo: DeviceInfo = {
          nodeId: nodeId.toString(),
          deviceName: browseName,
        };

        // Try to read common device properties
        const propertiesToRead = [
          { name: 'Manufacturer', id: '.Manufacturer' },
          { name: 'Model', id: '.Model' },
          { name: 'SerialNumber', id: '.SerialNumber' },
          { name: 'HardwareRevision', id: '.HardwareRevision' },
          { name: 'SoftwareRevision', id: '.SoftwareRevision' },
          { name: 'OperatingMode', id: '.OperatingMode' },
        ];

        for (const prop of propertiesToRead) {
          try {
            const value = await session.read({
              nodeId: NodeId.resolveNodeId(`${nodeId}${prop.id}`),
              attributeId: AttributeIds.Value,
            });
            if (value.value?.value !== null && value.value?.value !== undefined) {
              (deviceInfo as any)[prop.name.charAt(0).toLowerCase() + prop.name.slice(1)] =
                value.value.value;
            }
          } catch (err) {
            // Property doesn't exist or cannot be read
            // log(`${indent}Could not read ${prop.name} for device ${browseName}`);
          }
        }

        collectedData.devices.push(deviceInfo);
        // log(`${indent}Found device: ${browseName}`);
      }
    } catch (err) {
      // Not a device or error checking device type
    }

    for (const reference of browseResult.references) {
      const browseName = reference.browseName?.name?.toString() || 'Unknown';
      // log(`${indent}- ${browseName} (${reference.nodeId.toString()})`);

      nodeData.references.push({
        browseName: browseName,
        nodeId: reference.nodeId.toString(),
        nodeClass: reference.nodeClass,
        isForward: reference.isForward,
      });

      // Read values for variables
      if (reference.nodeClass === 2) {
        try {
          const dataValue = await session.read({
            nodeId: reference.nodeId,
            attributeId: AttributeIds.Value,
          });

          collectedData.variables.push({
            name: browseName,
            nodeId: reference.nodeId.toString(),
            value: dataValue.value?.value ?? null,
            dataType: dataValue.value?.dataType?.toString(),
            statusCode: dataValue.statusCode?.toString(),
            timestamp: dataValue.serverTimestamp?.toString(),
          });

          // log(
          //   `${indent}  Value: ${dataValue.value ? JSON.stringify(dataValue.value.value) : 'undefined'}`,
          // );
        } catch (err: any) {
          // log(`${indent}  Error reading value: ${err.message}`);
        }
      }

      // Read additional properties for objects
      if (reference.nodeClass === 1) {
        try {
          const propertiesToRead = [
            { name: 'Description', id: '.Description' },
            { name: 'DisplayName', id: '.DisplayName' },
          ];

          for (const prop of propertiesToRead) {
            try {
              const value = await session.read({
                nodeId: NodeId.resolveNodeId(`${reference.nodeId}${prop.id}`),
                attributeId: AttributeIds.Value,
              });
              if (value.value?.value !== null && value.value?.value !== undefined) {
                // log(`${indent}  ${prop.name}: ${value.value.value}`);
                // Store the property in the nodeData object
                (nodeData as any)[prop.name.charAt(0).toLowerCase() + prop.name.slice(1)] =
                  value.value.value;
              }
            } catch (err) {
              // Property doesn't exist or cannot be read
            }
          }
        } catch (err) {
          // Error reading properties
        }
      }

      await browseNode(
        session,
        collectedData,
        reference.nodeId,
        indent + '  ',
        maxDepth,
        currentDepth + 1,
      );
    }

    // Store the node data
    collectedData.nodes[nodeId.toString()] = nodeData;
  } catch (err: any) {
    // log(`${indent}Error browsing ${nodeId}: ${err.message}`);
  }
}

export async function fetchFromOcp({
  client,
  endpointUrl,
  nodesToBrowse,
  log,
}: {
  client: OPCUAClient;
  endpointUrl: string;
  nodesToBrowse?: string[];
  log: (a: string) => void;
}) {
  let session: ClientSession | null = null;
  let serverStateValue: any = undefined;

  try {
    log(`Attempting connection to ${endpointUrl}...`);
    await client.connect(endpointUrl);

    log(`Connected to ${endpointUrl} successfully!`);

    log('Creating session...');
    session = await client.createSession();
    log('Session established successfully!');

    // Read server state
    log('Reading server state...');
    const serverStateNode = NodeId.resolveNodeId('ns=0;i=2256'); // Server_ServerStatus_State
    const serverState = await session.read({
      nodeId: serverStateNode,
      attributeId: AttributeIds.Value,
    });

    if (serverState.value?.value) {
      serverStateValue = serverState.value.value;
      log(`Server state: ${serverState.value.value.state}`);
    }
  } catch (err: any) {
    log(`Failed to connect to ${endpointUrl}: ${err.message}`);
  }

  if (!session) {
    throw new Error('Failed to connect to any endpoint');
  }

  const collectedData: CollectedData = {
    timestamp: new Date().toISOString(),
    serverInfo: {
      endpointUrl,
      serverState: serverStateValue,
    },
    nodes: {},
    variables: [],
    devices: [],
  };

  if (nodesToBrowse) {
    for (const nodeId of nodesToBrowse) {
      log(`Starting browsing ${nodeId}...`);
      await browseNode(session, collectedData, nodeId);
    }
  } else {
    log('Starting browsing from Root folder...');
    await browseNode(session, collectedData, 'RootFolder');
  }

  log('\nClosing session and disconnecting...');
  await session.close();
  await client.disconnect();
  log('Disconnected successfully');

  return collectedData;
}
