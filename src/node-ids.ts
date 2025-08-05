import { NodeIdConfig, StandaloneNodeConfig } from './utils/types';

export const STANDALONE_NODE_IDS: StandaloneNodeConfig[] = [
  {
    nodeId: 'ns=3;s="DB_OPC"."i130E3"',
    tableName: 'i130E3',
    description: 'Wartość z czujnika na stacji RO (przewodność wody)',
  },
  {
    nodeId: 'ns=3;s="DB_OPC"."TE1.01_PV"',
    tableName: 'TE1_01_PV',
    description: 'Wartość z czujnika w piecu (Pomiar temperatury)',
  },
  {
    nodeId: 'ns=3;s="DB_OPC"."TE1.02_PV"',
    tableName: 'TE1_02_PV',
    description: 'Wartość z czujnika w piecu (Pomiar temperatury)',
  },
  {
    nodeId: 'ns=3;s="DB_OPC"."TE1.03_PV"',
    tableName: 'TE1_03_PV',
    description: 'Wartość z czujnika w piecu (Pomiar temperatury)',
  },
  {
    nodeId: 'ns=3;s="DB_OPC"."TE1.04_PV"',
    tableName: 'TE1_04_PV',
    description: 'Wartość z czujnika w piecu (Pomiar temperatury gazów wylotowych agregatu 1)',
  },
  {
    nodeId: 'ns=3;s="DB_OPC"."TE1.05_PV"',
    tableName: 'TE1_05_PV',
    description: 'Wartość z czujnika w piecu (Pomiar temperatury gazów wylotowych agregatu 2)',
  },
  {
    nodeId: 'ns=3;s="DB_OPC"."TE2.01_PV"',
    tableName: 'TE2_01_PV',
    description: 'Wartość z czujnika w suszarce (Pomiar temperatury)',
  },
  {
    nodeId: 'ns=3;s="DB_OPC"."iPCZBDI01_PV"',
    tableName: 'iPCZBDI01_PV',
    description: 'Wartość z czujnika na stacji RO (Ciśnieniowy pomiar poziomu w zbiorniku)',
  },
  {
    nodeId: 'ns=3;s="DB_OPC"."iPCM101_PV"',
    tableName: 'iPCM101_PV',
    description: 'Wartość z czujnika w strefie 1 myjki (Ciśnieniowy pomiar poziomu w zbiorniku)',
  },
  {
    nodeId: 'ns=3;s="DB_OPC"."iPCM102_PV"',
    tableName: 'iPCM102_PV',
    description: 'Wartość z czujnika w strefie 1 myjki (Ciśnienie natrysku POMM101)',
  },
  {
    nodeId: 'ns=3;s="DB_OPC"."iPCM103_PV"',
    tableName: 'iPCM103_PV',
    description: 'Wartość z czujnika w strefie 1 myjki (Ciśnienie natrysku POMM102)',
  },
  {
    nodeId: 'ns=3;s="DB_OPC"."iPCP101_PV"',
    tableName: 'iPCP101_PV',
    description: 'Wartość z czujnika w strefie 2 myjki (Ciśnieniowy pomiar poziomu w zbiorniku)',
  },
  {
    nodeId: 'ns=3;s="DB_OPC"."iPCP102_PV"',
    tableName: 'iPCP102_PV',
    description: 'Wartość z czujnika w strefie 2 myjki (Ciśnienie natrysku POMP101)',
  },
  {
    nodeId: 'ns=3;s="DB_OPC"."iPCP201_PV"',
    tableName: 'iPCP201_PV',
    description: 'Wartość z czujnika w strefie 3 myjki (Ciśnieniowy pomiar poziomu w zbiorniku)',
  },
  {
    nodeId: 'ns=3;s="DB_OPC"."iPCP202_PV"',
    tableName: 'iPCP202_PV',
    description: 'Wartość z czujnika w strefie 3 myjki (Ciśnienie natrysku POMP201)',
  },
  {
    nodeId: 'ns=3;s="DB_OPC"."iPCPD101_PV"',
    tableName: 'iPCPD101_PV',
    description: 'Wartość z czujnika w strefie 4 myjki (Ciśnieniowy pomiar poziomu w zbiorniku)',
  },
  {
    nodeId: 'ns=3;s="DB_OPC"."iPCPD102_PV"',
    tableName: 'iPCPD102_PV',
    description: 'Wartość z czujnika w strefie 4 myjki (Ciśnienie natrysku POMPD101)',
  },
  {
    nodeId: 'ns=3;s="DB_OPC"."iPCOX01_PV"',
    tableName: 'iPCOX01_PV',
    description: 'Wartość z czujnika w strefie 5 myjki (Ciśnieniowy pomiar poziomu w zbiorniku)',
  },
  {
    nodeId: 'ns=3;s="DB_OPC"."iPCOX02_PV"',
    tableName: 'iPCOX02_PV',
    description: 'Wartość z czujnika w strefie 5 myjki (Ciśnienie natrysku POMOX01)',
  },
  {
    nodeId: 'ns=3;s="DB_OPC"."iPCPD201_PV"',
    tableName: 'iPCPD201_PV',
    description: 'Wartość z czujnika w strefie 6 myjki (Ciśnieniowy pomiar poziomu w zbiorniku)',
  },
  {
    nodeId: 'ns=3;s="DB_OPC"."iPCPD202_PV"',
    tableName: 'iPCPD202_PV',
    description: 'Wartość z czujnika w strefie 6 myjki (Ciśnienie natrysku POMPD201)',
  },
  {
    nodeId: 'ns=3;s="DB_OPC"."iQCM101_PV"',
    tableName: 'iQCM101_PV',
    description: 'Wartość z czujnika w strefie 1 myjki (Pomiar przewodności)',
  },
  {
    nodeId: 'ns=3;s="DB_OPC"."iTCM101_PV"',
    tableName: 'iTCM101_PV',
    description: 'Wartość z czujnika w strefie 1 myjki (Pomiar temperatury)',
  },
];

export const NODE_IDS: Record<string, NodeIdConfig> = {
  traverseData: {
    baseNodeId: 'ns=3;s="DB_OPC"."Traverse_Data"',
    range: { start: 0, end: 100 },
    description: 'Dane z Traverse_Data',
  },
  traverseLoc: {
    baseNodeId: 'ns=3;s="DB_OPC"."Traverse_Loc"',
    range: { start: 0, end: 100 },
    description: 'Dane z Traverse_Loc',
  },
};

export function generateNodeIds(config: NodeIdConfig): string[] {
  const indexes = [];
  for (let i = config.range.start; i <= config.range.end; i++) {
    indexes.push(i);
  }
  return indexes.map(index => `${config.baseNodeId}[${index}]`);
}

export function isInterestedNodeId(nodeId: string): boolean {
  const rangedNodeIds = Object.values(NODE_IDS).flatMap(generateNodeIds);
  const standaloneNodeIds = STANDALONE_NODE_IDS.map(config => config.nodeId);
  const allNodeIds = [...rangedNodeIds, ...standaloneNodeIds];
  return allNodeIds.includes(nodeId);
}

export function isStandaloneNodeId(nodeId: string): boolean {
  return STANDALONE_NODE_IDS.some(config => config.nodeId === nodeId);
}

export function getStandaloneNodeConfig(nodeId: string): StandaloneNodeConfig | null {
  return STANDALONE_NODE_IDS.find(config => config.nodeId === nodeId) || null;
}

export function getAllInterestedNodeIds(): string[] {
  const rangedNodeIds = Object.values(NODE_IDS).flatMap(generateNodeIds);
  const standaloneNodeIds = STANDALONE_NODE_IDS.map(config => config.nodeId);
  return [...rangedNodeIds, ...standaloneNodeIds];
}
