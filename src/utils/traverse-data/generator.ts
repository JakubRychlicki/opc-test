import type { Kysely } from 'kysely';
import { sql } from 'kysely';
import { DataTableConfig } from '../types';

export function createTraverseDataTable(db: Kysely<any>, config: DataTableConfig) {
  return db.schema
    .createTable(config.tableName)
    .addColumn('id', sql`int IDENTITY(1,1)`, col => col.primaryKey())
    .addColumn('productID0', sql`int`)
    .addColumn('productID1', sql`int`)
    .addColumn('productID2', sql`int`)
    .addColumn('productID3', sql`int`)
    .addColumn('order0', sql`int`)
    .addColumn('order1', sql`int`)
    .addColumn('order2', sql`int`)
    .addColumn('order3', sql`int`)
    .addColumn('comment0', sql`varchar(1000)`)
    .addColumn('comment1', sql`varchar(1000)`)
    .addColumn('comment2', sql`varchar(1000)`)
    .addColumn('comment3', sql`varchar(1000)`)
    .addColumn('route', sql`int`)
    .addColumn('ral', sql`varchar(50)`)
    .addColumn('GMPSpeed', sql`float`)
    .addColumn('GMPProgramm', sql`int`)
    .addColumn('MNPProgramm', sql`int`)
    .addColumn('specialManual', sql`bit`)
    .addColumn('specialAuto', sql`bit`)
    .addColumn('specialOnlyD', sql`bit`)
    .addColumn('colorNeedChange', sql`bit`)
    .addColumn('dataChanged', sql`bit`)
    .addColumn('loadTime', sql`datetime2`)
    .addColumn('MNPEntranceTime', sql`datetime2`)
    .addColumn('MNPExitTime', sql`datetime2`)
    .addColumn('SUMEntranceTime', sql`datetime2`)
    .addColumn('SUMExitTime', sql`datetime2`)
    .addColumn('GMPAEntranceTime', sql`datetime2`)
    .addColumn('GMPAExitTime', sql`datetime2`)
    .addColumn('GMPREntranceTime', sql`datetime2`)
    .addColumn('GMPRExitTime', sql`datetime2`)
    .addColumn('PPREntranceTime', sql`datetime2`)
    .addColumn('PPRExitTime', sql`datetime2`)
    .addColumn('unloadTime', sql`datetime2`)
    .addColumn('PPRTE101', sql`float`)
    .addColumn('PPRTE102', sql`float`)
    .addColumn('PPRTE103', sql`float`)
    .addColumn('PPRMedium', sql`float`)
    .addColumn('dataType', sql`varchar(10)`)
    .addColumn('statusCode', sql`varchar(100)`)
    .addColumn('timestamp', sql`datetime2`)
    .addColumn('createdAt', sql`datetime2`, col => col.defaultTo(sql`GETDATE()`));
}

export function dropTraverseDataTable(db: Kysely<any>, tableName: string) {
  return db.schema.dropTable(tableName);
}

export function generateTraverseDataTableName(index: number): string {
  return `TraverseData_${index.toString().padStart(3, '0')}`;
}

export function generateAllTraverseDataTableNames(start: number, end: number): string[] {
  const tableNames: string[] = [];
  for (let i = start; i <= end; i++) {
    tableNames.push(generateTraverseDataTableName(i));
  }
  return tableNames;
}
