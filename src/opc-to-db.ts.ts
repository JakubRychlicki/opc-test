import { db } from './db/client.js';
import { CollectedData } from './opc.js';

export async function insertCollectedDataIntoDb(
  collectedData: CollectedData,
  log: (a: string) => void
) {
  log('Inserting collection data into database...');
  await db.transaction().execute(async tx => {
    // Insert variable values
    for (const variable of collectedData.variables) {
    }

    log('Finished inserting data into database');
  });
}
