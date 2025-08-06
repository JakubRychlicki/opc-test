import { db } from './db/client.js';
import { CollectedData } from './opc.js';
import { processVariable } from './utils/process-variable.js';
import { VariableItem } from './utils/types.js';

export async function insertCollectedDataIntoDb(
  collectedData: CollectedData,
  log: (a: string) => void
) {
  log('Inserting collection data into database...');
  await db.transaction().execute(async tx => {
    // Insert variable values
    for (const variable of collectedData.variables) {
      await processVariable(tx, variable as VariableItem);
    }

    log('Finished inserting data into database');
  });
}
