import { getStandaloneNodeConfig, isInterestedNodeId, NODE_IDS } from '../node-ids';
import { extractIndexFromNodeId, isStandaloneNode, isTraverseData, isTraverseLoc } from './helpers';
import { transformStandaloneNodeItem } from './standalone-nodes/transformer';
import { transformTraverseDataItem } from './traverse-data/transformer';
import { transformTraverseLocItem } from './traverse-loc/transformer';
import { TraverseDataItem, TraverseLocItem, VariableItem } from './types';

function getTableName(nodeId: string): string | null {
  if (isStandaloneNode(nodeId)) {
    const config = getStandaloneNodeConfig(nodeId);
    if (config) {
      return config.tableName;
    }

    const cleanNodeId = nodeId.replace(/[^a-zA-Z0-9]/g, '_');
    return `Standalone_${cleanNodeId}`;
  }

  for (const [key, config] of Object.entries(NODE_IDS)) {
    if (nodeId.startsWith(config.baseNodeId)) {
      const index = extractIndexFromNodeId(nodeId);
      if (index !== null && index >= config.range.start && index <= config.range.end) {
        if (key === 'traverseData') {
          return `TraverseData_${index.toString().padStart(3, '0')}`;
        } else if (key === 'traverseLoc') {
          return `TraverseLoc_${index.toString().padStart(3, '0')}`;
        }
      }
    }
  }
  return null;
}

export async function processVariable(kyselyDb: any, variable: VariableItem): Promise<boolean> {
  if (!isInterestedNodeId(variable.nodeId)) {
    return false;
  }

  const tableName = getTableName(variable.nodeId);
  if (!tableName) {
    return false;
  }

  if (isStandaloneNode(variable.nodeId)) {
    return await transformStandaloneNodeItem(kyselyDb, tableName, variable);
  }

  if (isTraverseData(variable.nodeId)) {
    const item = variable.value as TraverseDataItem;
    return await transformTraverseDataItem(kyselyDb, tableName, variable, item);
  } else if (isTraverseLoc(variable.nodeId)) {
    const item = variable.value as TraverseLocItem;
    return await transformTraverseLocItem(kyselyDb, tableName, variable, item);
  }

  return false;
}
