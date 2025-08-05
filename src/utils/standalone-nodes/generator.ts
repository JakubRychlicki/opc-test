import type { Kysely } from 'kysely';
import { sql } from 'kysely';
import { StandaloneNodeConfig } from '../types';

export function createStandaloneNodeTable(db: Kysely<any>, config: StandaloneNodeConfig) {
  return db.schema
    .createTable(config.tableName)
    .addColumn('id', sql`int IDENTITY(1,1)`, col => col.primaryKey())
    .addColumn('value', sql`float`)
    .addColumn('dataType', sql`varchar(10)`)
    .addColumn('statusCode', sql`varchar(100)`)
    .addColumn('timestamp', sql`datetime2`)
    .addColumn('createdAt', sql`datetime2`, col => col.defaultTo(sql`GETDATE()`));
}

export function dropStandaloneNodeTable(db: Kysely<any>, tableName: string) {
  return db.schema.dropTable(tableName);
}

export function generateStandaloneNodeTableName(config: StandaloneNodeConfig): string {
  return config.tableName;
}

export function generateAllStandaloneNodeTableNames(configs: StandaloneNodeConfig[]): string[] {
  return configs.map(config => generateStandaloneNodeTableName(config));
} 