import * as fs from 'fs';
import * as path from 'path';
import { Database } from '../db/database';
import { isInterestedNodeId, NODE_IDS, getStandaloneNodeConfig } from '../node-ids';
import { transformTraverseDataItem } from '../utils/traverse-data/transformer';
import { transformTraverseLocItem } from '../utils/traverse-loc/transformer';
import { transformStandaloneNodeItem } from '../utils/standalone-nodes/transformer';
import { TraverseDataItem, TraverseLocItem, VariableItem } from '../utils/types';
import { extractIndexFromNodeId, isTraverseData, isTraverseLoc, isStandaloneNode } from '../utils/helpers';

interface ProdData {
  variables: VariableItem[];
}

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

async function processVariable(kyselyDb: any, variable: VariableItem): Promise<boolean> {
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

async function importData() {
  const db = new Database();

  try {
    console.log('Import danych zaczyna się...');
    const jsonContent = fs.readFileSync(path.join(__dirname, '../../mocks/real_prod.json'), 'utf-8');

    try {
      const data: ProdData = JSON.parse(jsonContent);

      await db.connect();
      const kyselyDb = db.getDb();

      let processedCount = 0;

      for (const variable of data.variables) {
        const success = await processVariable(kyselyDb, variable);
        if (success) {
          processedCount++;
        }
      }

      console.log(`Przetworzono ${processedCount} rekordów`);
      console.log('Import danych zakończony pomyślnie!');

      await db.disconnect();
    } catch (parseError) {
      console.error('Błąd podczas parsowania danych:', parseError);
      await db.disconnect();
    }
  } catch (error) {
    console.error('Błąd podczas importu danych:', error);
    await db.disconnect();
    process.exit(1);
  }
}

importData();
