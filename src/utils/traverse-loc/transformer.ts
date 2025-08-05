import { convertBoolean, parseTimestamp } from '../data-converters';
import { TraverseLocItem, VariableItem } from '../types';

export async function transformTraverseLocItem(
  kyselyDb: any,
  tableName: string,
  variable: VariableItem,
  item: TraverseLocItem
): Promise<boolean> {
  const parsedTimestamp = parseTimestamp(variable.timestamp);
  
  const insertData = {
    number: item.number,
    loc1_ID: item.loc1_ID,
    loc1_pos: item.loc1_pos,
    loc2_ID: item.loc2_ID,
    loc2_pos: item.loc2_pos,
    loc3_ID: item.loc3_ID,
    loc3_pos: item.loc3_pos,
    loc4_ID: item.loc4_ID,
    loc4_pos: item.loc4_pos,
    loc5_ID: item.loc5_ID,
    loc5_pos: item.loc5_pos,
    reserve_INT1: item.reserve_INT1,
    reserve_INT2: item.reserve_INT2,
    reserve_INT3: item.reserve_INT3,
    reserve_bool1: convertBoolean(item.reserve_bool1),
    reserve_bool2: convertBoolean(item.reserve_bool2),
    reserve_bool3: convertBoolean(item.reserve_bool3),
    dataType: variable.dataType,
    statusCode: variable.statusCode,
    timestamp: parsedTimestamp,
  };

  try {
    await kyselyDb.insertInto(tableName as any).values(insertData).execute();
    console.log(`Dodano rekord do tabeli ${tableName}`);
    return true;
  } catch (error) {
    console.error(`Błąd podczas dodawania do tabeli ${tableName}:`, error);
    return false;
  }
}