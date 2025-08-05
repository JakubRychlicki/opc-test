import type { Kysely } from 'kysely';
import { sql } from 'kysely';
import { DataTableConfig } from '../types';

export function createTraverseLocTable(db: Kysely<any>, config: DataTableConfig) {
  return db.schema
    .createTable(config.tableName)
    .addColumn('id', sql`int IDENTITY(1,1)`, col => col.primaryKey())
    .addColumn('number', sql`int`)
    .addColumn('loc1_ID', sql`int`)
    .addColumn('loc1_pos', sql`int`)
    .addColumn('loc2_ID', sql`int`)
    .addColumn('loc2_pos', sql`int`)
    .addColumn('loc3_ID', sql`int`)
    .addColumn('loc3_pos', sql`int`)
    .addColumn('loc4_ID', sql`int`)
    .addColumn('loc4_pos', sql`int`)
    .addColumn('loc5_ID', sql`int`)
    .addColumn('loc5_pos', sql`int`)
    .addColumn('reserve_INT1', sql`int`)
    .addColumn('reserve_INT2', sql`int`)
    .addColumn('reserve_INT3', sql`int`)
    .addColumn('reserve_bool1', sql`bit`)
    .addColumn('reserve_bool2', sql`bit`)
    .addColumn('reserve_bool3', sql`bit`)
    .addColumn('dataType', sql`varchar(10)`)
    .addColumn('statusCode', sql`varchar(100)`)
    .addColumn('timestamp', sql`datetime2`)
    .addColumn('createdAt', sql`datetime2`, col => col.defaultTo(sql`GETDATE()`));
}

export function dropTraverseLocTable(db: Kysely<any>, tableName: string) {
  return db.schema.dropTable(tableName);
}

export function generateTraverseLocTableName(index: number): string {
  return `TraverseLoc_${index.toString().padStart(3, '0')}`;
}

export function generateAllTraverseLocTableNames(start: number, end: number): string[] {
  const tableNames: string[] = [];
  for (let i = start; i <= end; i++) {
    tableNames.push(generateTraverseLocTableName(i));
  }
  return tableNames;
}
