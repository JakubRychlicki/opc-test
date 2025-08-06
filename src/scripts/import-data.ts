import * as fs from 'fs';
import * as path from 'path';
import { Database } from '../db/database';
import { processVariable } from '../utils/process-variable';
import { VariableItem } from '../utils/types';

interface ProdData {
  variables: VariableItem[];
}

async function importData() {
  const db = new Database();

  try {
    console.log('Import danych zaczyna się...');
    const jsonContent = fs.readFileSync(
      path.join(__dirname, '../../mocks/real_prod.json'),
      'utf-8',
    );

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
