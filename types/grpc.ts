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
  tempK: number;
  pressure: number;
}

// StateMachineValues message
export interface StateMachineValues {
  time: number;
  temp: number;
  tempk: number;
  dtemp: number;
  pressure: number;
  dr: number;
  fr: number;
  r: number;
  sumfr: number;
  sumr: number;
}

// Enum ProcessConfigType
export enum ProcessConfigType {
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
  TARGETF = 0,
  TIME = 1,
}

// ProcessConfig message
export interface ProcessConfig {
  type: ProcessConfigType;
  customTemp: number;
  mode: ProcessConfigMode;
  targetF: number;
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
  processLength: string;
}

// ProcessLogRow message
export interface ProcessLogRow {
  id: number;
  productName: string;
  productQuantity: string;
  bacteria: string;
  description: string;
  processStart: string;
  processLength: string;
}

// ProcessInfoList message
export interface ProcessInfoList {
  processes: ProcessLogRow[];
}

// StartProcessRequest message
export interface StartProcessRequest {
  processConfig: ProcessConfig;
  processInfo: ProcessInfo;
}
