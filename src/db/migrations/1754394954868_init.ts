import type { Kysely } from 'kysely';
import {
  createTraverseDataTable,
  dropTraverseDataTable,
  generateTraverseDataTableName,
} from '../../utils/traverse-data/generator';
import {
  createTraverseLocTable,
  dropTraverseLocTable,
  generateTraverseLocTableName,
} from '../../utils/traverse-loc/generator';
import {
  createStandaloneNodeTable,
  dropStandaloneNodeTable,
  generateStandaloneNodeTableName,
} from '../../utils/standalone-nodes/generator';
import { STANDALONE_NODE_IDS } from '../../node-ids';

export async function up(db: Kysely<any>): Promise<void> {
  // Create StandaloneNode tables
  for (const config of STANDALONE_NODE_IDS) {
    await createStandaloneNodeTable(db, config).execute();
  }

  // Create TraverseData tables
  for (let i = 0; i <= 100; i++) {
    const tableName = generateTraverseDataTableName(i);
    await createTraverseDataTable(db, { tableName, index: i }).execute();
  }

  // Create TraverseLoc tables
  for (let i = 0; i <= 100; i++) {
    const tableName = generateTraverseLocTableName(i);
    await createTraverseLocTable(db, { tableName, index: i }).execute();
  }
}

export async function down(db: Kysely<any>): Promise<void> {
  // Delete StandaloneNode tables
  for (const config of STANDALONE_NODE_IDS) {
    const tableName = generateStandaloneNodeTableName(config);
    await dropStandaloneNodeTable(db, tableName).execute();
  }

  // Delete TraverseLoc tables
  for (let i = 0; i <= 100; i++) {
    const tableName = generateTraverseLocTableName(i);
    await dropTraverseLocTable(db, tableName).execute();
  }

  // Delete TraverseData tables
  for (let i = 0; i <= 100; i++) {
    const tableName = generateTraverseDataTableName(i);
    await dropTraverseDataTable(db, tableName).execute();
  }
}
