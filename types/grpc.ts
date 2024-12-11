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
  targetk: number;
  serialdatatime: number;
  statemachinetick: number;
  sterilizationtemp: number;
  pasterizationtemp: number;
}

// SetVariable message
export interface SetVariable {
  name: string;
  value: string;
}

// SensorValues message
export interface SensorValues {
  temp: number;
  tempk: number;
  pressure: number;
}

export interface SensorRelayValues {
  waterfill: number;
  heating: number;
  bypass: number;
  pump: number;
  inpressure: number;
  cooling: number;
}

// StateMachineValues message
export interface StateMachineValues {
  id: number;
  time: number;
  temp: number;
  tempk: number;
  dtemp: number;
  pressure: number;
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
  targetFValues: string[];
  processLengthValues: string[];
}

export interface ProcessType {
  id: number;
  name: string;
  type?: string;
  customtemp?: number;
  finishtemp?: number;
  maintainpressure?: number;
  maintaintemp?: number;
}

export interface ProcessTypesResponse {
  processtypesList: ProcessType[];
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

// ProcessConfig message
export interface ProcessConfig {
  type: ProcessConfigType;
  customTemp: number;
  mode: ProcessConfigMode;  
  targetTime: number;
  maintainTemp: number;
  maintainPressure: number;
  finishTemp: number;
}

// ProcessInfo message
export interface ProcessInfo {
  productName: string;
  productQuantity: string;
  bacteria: string;
  description: string;
  processStart: string;
  targetF: string;
  processLength: string;
}

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
  processesList: ProcessInfoRow[];
}

export interface ProcessTypeRequest {
  customTemp: number;
  finishTemp: number;
  maintainPressure: number;
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