import { MessageSecurityMode, SecurityPolicy } from 'node-opcua-client';

export const config = {
  dbOptions: {
    server: process.env.DB_HOST || 'localhost',
    authentication: {
      type: 'default' as const,
      options: {
        userName: process.env.DB_USER || 'sa',
        password: process.env.DB_PASSWORD || 'YourStrong@Passw0rd',
      },
    },
    options: {
      database: process.env.DB_NAME || 'OPCUADataManagement',
      port: parseInt(process.env.DB_PORT || '1433'),
      trustServerCertificate: true,
    },
  },
  opcServers: [
    {
      opcClientOptions: {
        securityMode: MessageSecurityMode.None,
        securityPolicy: SecurityPolicy.None,
        endpointMustExist: false,
        requestedSessionTimeout: 60000,
        connectionStrategy: {
          initialDelay: 1000,
          maxRetry: 1,
          maxDelay: 2000,
        },
        connectionTimeout: 5000,
      },
      endpointUrl: 'opc.tcp://10.48.216.14:4840',
      nodesToBrowse: ['ns=3;s="DB_OPC"'],
    },
  ],
  debug: {
    saveJson: process.env.DEBUG_SAVE_JSON ?? false,
    fetchLimit: process.env.DEBUG_FETCH_LIMIT ? Number(process.env.DEBUG_FETCH_LIMIT) : undefined,
    timeoutBetweenFetches: process.env.DEBUG_TIMEOUT_BETWEEN_FETCHES
      ? Number(process.env.DEBUG_TIMEOUT_BETWEEN_FETCHES)
      : 1000,
  },
} as const;