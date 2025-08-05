import { parseTimestamp } from '../data-converters';
import { VariableItem, StandaloneNodeItem } from '../types';

export interface StandaloneNodeData {
  value: number;
  dataType: string;
  statusCode: string;
  timestamp?: string | undefined;
}

export function transformStandaloneNodeData(variableItem: VariableItem): StandaloneNodeData {
  const value =
    typeof variableItem.value === 'number'
      ? variableItem.value
      : (variableItem.value as StandaloneNodeItem).value;
  return {
    value: value,
    dataType: variableItem.dataType,
    statusCode: variableItem.statusCode,
    timestamp: variableItem.timestamp,
  };
}

export function transformStandaloneNodeDataForInsert(variableItem: VariableItem): {
  value: number;
  dataType: string;
  statusCode: string;
  timestamp: Date | null;
} {
  const value =
    typeof variableItem.value === 'number'
      ? variableItem.value
      : (variableItem.value as StandaloneNodeItem).value;
  return {
    value: value,
    dataType: variableItem.dataType,
    statusCode: variableItem.statusCode,
    timestamp: variableItem.timestamp ? new Date(variableItem.timestamp) : null,
  };
}

export async function transformStandaloneNodeItem(
  kyselyDb: any,
  tableName: string,
  variable: VariableItem
): Promise<boolean> {
  const parsedTimestamp = parseTimestamp(variable.timestamp);

  const value =
    typeof variable.value === 'number'
      ? variable.value
      : (variable.value as StandaloneNodeItem).value;

  const insertData = {
    value: value,
    dataType: variable.dataType,
    statusCode: variable.statusCode,
    timestamp: parsedTimestamp,
  };

  try {
    await kyselyDb
      .insertInto(tableName as any)
      .values(insertData)
      .execute();
    console.log(`Dodano rekord do tabeli ${tableName}`);
    return true;
  } catch (error) {
    console.error(`Błąd podczas dodawania do tabeli ${tableName}:`, error);
    return false;
  }
}
