import { TimeData } from './data-converters';

export interface NodeIdConfig {
  baseNodeId: string;
  range: {
    start: number;
    end: number;
  };
  description: string;
}

export interface StandaloneNodeConfig {
  nodeId: string;
  tableName: string;
  description: string;
}

export interface StandaloneNodeItem {
  value: number;
}

export interface VariableItem {
  name: string;
  nodeId: string;
  value: TraverseDataItem | TraverseLocItem | StandaloneNodeItem | number;
  dataType: string;
  statusCode: string;
  timestamp?: string;
}

export interface ProdData {
  variables: VariableItem[];
}

export interface TraverseDataItem {
  productID: number[];
  order: number[];
  comment: string[];
  route: number;
  ral: string;
  GMP_speed: number;
  GMP_programm: number;
  MNP_programm: number;
  special_manual: number;
  special_auto: number;
  special_onlyD: number;
  colorNeedChange: boolean;
  dataChanged: boolean;
  times: {
    load: TimeData;
    MNP_entrance: TimeData;
    MNP_exit: TimeData;
    SUM_entrance: TimeData;
    SUM_exit: TimeData;
    GMP_a_entrance: TimeData;
    GMP_a_exit: TimeData;
    GMP_r_entrance: TimeData;
    GMP_r_exit: TimeData;
    PPR_entrance: TimeData;
    PPR_exit: TimeData;
    unload: TimeData;
  };
  PPR_TE101: number;
  PPR_TE102: number;
  PPR_TE103: number;
  PPR_medium: number;
}

export interface TraverseLocItem {
  number: number;
  loc1_ID: number;
  loc1_pos: number;
  loc2_ID: number;
  loc2_pos: number;
  loc3_ID: number;
  loc3_pos: number;
  loc4_ID: number;
  loc4_pos: number;
  loc5_ID: number;
  loc5_pos: number;
  reserve_INT1: number;
  reserve_INT2: number;
  reserve_INT3: number;
  reserve_bool1: number;
  reserve_bool2: number;
  reserve_bool3: number;
}

export interface DataTableConfig {
  tableName: string;
  index: number;
}
