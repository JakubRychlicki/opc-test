import * as fs from 'node:fs';
import * as path from 'node:path';
import { CollectedData } from '../opc.js';
import { NODE_IDS, isStandaloneNodeId } from '../node-ids';

export function extractIndexFromNodeId(nodeId: string): number | null {
    const match = nodeId.match(/\[(\d+)\]$/);
    return match && match[1] ? parseInt(match[1], 10) : null;
  }

export function isTraverseData(nodeId: string): boolean {
  return NODE_IDS['traverseData'] ? nodeId.startsWith(NODE_IDS['traverseData'].baseNodeId) : false;
}

export function isTraverseLoc(nodeId: string): boolean {
  return NODE_IDS['traverseLoc'] ? nodeId.startsWith(NODE_IDS['traverseLoc'].baseNodeId) : false;
}

export function isStandaloneNode(nodeId: string): boolean {
  return isStandaloneNodeId(nodeId);
}

export async function saveToFile(collectedData: CollectedData) {
  const outputDir = path.join(process.cwd(), 'outputs');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputFile = path.join(outputDir, `opcua_data_${Date.now()}.json`);
  fs.writeFileSync(outputFile, JSON.stringify(collectedData, null, 2));
  console.log(`\nData saved to ${outputFile}`);
}

export function sleep(ms: number) {
  return new Promise<void>((res) => {
    setTimeout(() => {
      res();
    }, ms);
  });
}
