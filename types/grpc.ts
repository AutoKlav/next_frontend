// gRPC error
export interface GrpcError {
  code: number;
  message: string;
  metadata: string;
}

// Empty message
export interface Empty {}

// Status message
export interface Status {
  code: number;
  errors: number;
  errorsstring: string;
}

// Variables message
export interface Variables {
  stateMachineTick: number;
  dbTick: number;
  k: number;
  coolingThreshold: number;
  expansionUpperTemp: number;
  expansionLowerTemp: number;
  heaterWaterLevel: number;
  maintainWaterTankTemp: number;
}

// SetVariable message
export interface SetVariable {
  name: string;
  value: string;
}

// SensorValues message
export interface SensorValues {
  temp: number;
  expansiontemp: number;
  heatertemp: number;
  tanktemp: number;
  tempk: number;
  tankwaterlevel: number;
  pressure: number;
  steampressure: number;
  doorClosed: number;
  burnerFault: number;
  waterShortage: number;
}

export interface SensorRelayValues {
  filltankwithwater: number;
  cooling: number;
  tankheating: number;
  coolinghelper: number;
  autoklavfill: number;
  waterdrain: number;
  heating: number;
  pump: number;
  electricheating: number;
  increasepressure: number;
  extensioncooling: number;
  alarmsignal: number;
}

// StateMachineValues message
export interface StateMachineValues {
  id: number;
  elapsedtime: number;
  sensorvalues: SensorValues;
  dTemp: number;
  state: number;
  dr: number;
  fr: number;
  r: number;
  sumfr: number;
  sumr: number;
  timestamp: string;
  errorsstring: string | undefined;
}

export interface ProcessLogList {
  processlogsList: StateMachineValues[];
}

export interface FilteredProcessList {
  values: string[];
  valuesList: string[];
}

export interface ProcessFilterRequest {
  productName: string;
  productQuantity: string;
}

export interface FilteredModeProcessList {
  targetfvaluesList: string[];
  processlengthvaluesList: string[];
}

export interface ProcessType {
  id: number;
  name: string;
  type?: string;
  customtemp?: number;
  finishtemp?: number;  
  maintaintemp?: number;
  d0?: number;
  z?: number;
}

export interface ProcessTypesResponse {
  processtypesList: ProcessType[];
}

export interface Bacteria {
  id: number;
  name: string;
  description: string;
  d0: number;
  z: number;
}

export interface BacteriaList {
  bacteriaList: Bacteria[];
}

// Enum ProcessConfigType
export enum ProcessConfigType {
  UNKNOWN = -1,
  STERILIZATION = 0,
  PASTERIZATION = 1,
  CUSTOM = 2,  
}

// Enum ProcessConfigState
export enum ProcessConfigState {
  READY = 0,
  STARTING = 1,
  FILLING = 2,
  HEATING = 3,
  COOLING = 4,
  FINISHING = 5,
  FINISHED = 6,
}

// Enum ProcessConfigMode
export enum ProcessConfigMode {
  UNKNOWN = -1,
  TARGETF = 0,
  TIME = 1,
}

export enum HeatingType {
  UNKNOWN = -1,
  STEAM  = 0,
  ELECTRIC = 1,
}

// ProcessConfig message
export interface ProcessConfig {
  type: ProcessConfigType;
  heatingType: HeatingType;
  customTemp: number;
  mode: ProcessConfigMode;  
  maintainTemp: number;
  finishTemp: number;
}

// ProcessInfo message
export interface ProcessInfo {
  productName: string;
  productQuantity: string;
  batchLTO: string;
  bacteria: Bacteria;  
  processStart: string;
  targetF: string;
  processLength: string;
  targetHeatingTime: string;
  targetCoolingTime: string;   
}

export interface ProcessInfoGraphView {
  id: number;
  batchlto: string;
  bacteria: Bacteria;
  productname?: string;
  productquantity?: string;
  processstart?: string;
  processlength?: string;
};

export interface ProcessSuggestions {
  productName?: string[];
  productQuantity?: string[];
  bacteria?: string[];
  description?: string[];
  processStart?: string[];
  targetF?: string[];
  processLength?: string[];
}

// ProcessInfoRow message
export interface ProcessInfoRow {
  id: number;
  productname: string;
  productquantity: string;
  bacteria: string;
  description: string;
  processstart: string;
  processlength: string;
}

// ProcessInfoList message
export interface ProcessInfoList {
  processesList: ProcessInfoGraphView[];
}

export interface ProcessTypeRequest {
  customTemp: number;
  finishTemp: number;  
  name: string;
  pressure: number;
  type: string;
}

export interface TypeRequest {
  id: number;
}

// StartProcessRequest message
export interface StartProcessRequest {
  processConfig: ProcessConfig;
  processInfo: ProcessInfo;
}

export interface UpdateSensorRequest {
  name: string | undefined;
  minValue: number;
  maxValue: number;
}