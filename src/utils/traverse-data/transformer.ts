import { convertTimeData, convertBoolean, parseTimestamp } from '../data-converters';
import { TraverseDataItem, VariableItem } from '../types';

export async function transformTraverseDataItem(
  kyselyDb: any,
  tableName: string,
  variable: VariableItem,
  item: TraverseDataItem
): Promise<boolean> {
  const parsedTimestamp = parseTimestamp(variable.timestamp);
  
  const insertData = {
    // Product ID
    productID0: item.productID[0] || 0,
    productID1: item.productID[1] || 0,
    productID2: item.productID[2] || 0,
    productID3: item.productID[3] || 0,

    // Order
    order0: item.order[0] || 0,
    order1: item.order[1] || 0,
    order2: item.order[2] || 0,
    order3: item.order[3] || 0,

    // Comments
    comment0: item.comment[0] || null,
    comment1: item.comment[1] || null,
    comment2: item.comment[2] || null,
    comment3: item.comment[3] || null,

    // Technical parameters
    route: item.route,
    ral: item.ral,
    GMPSpeed: item.GMP_speed,
    GMPProgramm: item.GMP_programm,
    MNPProgramm: item.MNP_programm,

    // Special flags
    specialManual: convertBoolean(item.special_manual),
    specialAuto: convertBoolean(item.special_auto),
    specialOnlyD: convertBoolean(item.special_onlyD),
    colorNeedChange: item.colorNeedChange,
    dataChanged: item.dataChanged,

    // Timestamps
    loadTime: convertTimeData(item.times.load),
    MNPEntranceTime: convertTimeData(item.times.MNP_entrance),
    MNPExitTime: convertTimeData(item.times.MNP_exit),
    SUMEntranceTime: convertTimeData(item.times.SUM_entrance),
    SUMExitTime: convertTimeData(item.times.SUM_exit),
    GMPAEntranceTime: convertTimeData(item.times.GMP_a_entrance),
    GMPAExitTime: convertTimeData(item.times.GMP_a_exit),
    GMPREntranceTime: convertTimeData(item.times.GMP_r_entrance),
    GMPRExitTime: convertTimeData(item.times.GMP_r_exit),
    PPREntranceTime: convertTimeData(item.times.PPR_entrance),
    PPRExitTime: convertTimeData(item.times.PPR_exit),
    unloadTime: convertTimeData(item.times.unload),

    // PPR temperatures
    PPRTE101: item.PPR_TE101,
    PPRTE102: item.PPR_TE102,
    PPRTE103: item.PPR_TE103,
    PPRMedium: item.PPR_medium,

    // OPC UA metadata
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