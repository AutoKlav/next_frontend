import {
  FilteredModeProcessList,
  FilteredProcessList,
  ProcessFilterRequest,
  ProcessInfoList,
  ProcessLogList,
  ProcessTypesResponse,
  SensorRelayValues,
  SensorValues,
  SetVariable,
  StartProcessRequest,
  StateMachineValues,
  Status,
  UpdateSensorRequest,
  Variables,
} from "@/types/grpc";
import { gRpcCall } from "./client";

const Messages = require("./autoklav_pb");

// Status
export const getStatus = () => {
  const data = new Messages.Empty();

  return gRpcCall<Status>("getStatus", data);
};

// Global variables
export const getVariables = () => {
  const data = new Messages.Empty();

  return gRpcCall<Variables>("getVariables", data);
};

export const setVariable = (setVariable: SetVariable) => {
  const data = new Messages.SetVariable();
  data.setName(setVariable.name);
  data.setValue(setVariable.value);

  return gRpcCall<Status>("setVariable", data);
};

// Process
export const startProcess = (startProcessRequest: StartProcessRequest) => {
  const data = new Messages.StartProcessRequest();
  const processInfo = new Messages.ProcessInfo();
  processInfo.setProductname(startProcessRequest.processInfo.productName);
  processInfo.setProductquantity(
    startProcessRequest.processInfo.productQuantity
  );
  processInfo.setBacteria(startProcessRequest.processInfo.bacteria);
  processInfo.setDescription(startProcessRequest.processInfo.description);
  processInfo.setProcessstart(startProcessRequest.processInfo.processStart);
  processInfo.setTargetf(startProcessRequest.processInfo.targetF);
  processInfo.setProcesslength(startProcessRequest.processInfo.processLength);
  data.setProcessinfo(processInfo);

  const processConfig = new Messages.ProcessConfig();
  processConfig.setType(startProcessRequest.processConfig.type);
  processConfig.setCustomtemp(startProcessRequest.processConfig.customTemp);
  processConfig.setMode(startProcessRequest.processConfig.mode);
  processConfig.setTargettime(startProcessRequest.processConfig.targetTime);
  processConfig.setMaintaintemp(startProcessRequest.processConfig.maintainTemp);
  processConfig.setMaintainpressure(
    startProcessRequest.processConfig.maintainPressure
  );
  processConfig.setFinishtemp(startProcessRequest.processConfig.finishTemp);
  data.setProcessconfig(processConfig);

  return gRpcCall<Status>("startProcess", data);
};

export const stopProcess = () => {
  const data = new Messages.Empty();

  return gRpcCall<Status>("stopProcess", data);
};

export const updateSensor = (updateSensorRequest: UpdateSensorRequest) => {
  const data = new Messages.UpdateSensorRequest();
  data.setName(updateSensorRequest.name);
  data.setMinvalue(updateSensorRequest.minValue);
  data.setMaxvalue(updateSensorRequest.maxValue);

  return gRpcCall<Status>("updateSensor", data);
}

export const getAllProcesses = () => {
  const data = new Messages.Empty();

  return gRpcCall<ProcessInfoList>("getAllProcesses", data);
};

export const getDistinctProcessValues = (columnName: string) =>{
  const data = new Messages.ProcessFilterRequest();
  data.setColumnname(columnName);

  return gRpcCall<FilteredProcessList>("getDistinctProcessValues", data);
}

export const getAllProcessTypes = () => {
  const data = new Messages.Empty();

  return gRpcCall<ProcessTypesResponse>("getAllProcessTypes", data);
}

export const getFilteredModeValues = (filterModeRequest: ProcessFilterRequest) => {
  const data = new Messages.ProcessModeFilterRequest();
  data.setProductname(filterModeRequest.productName);
  data.setProductquantity(filterModeRequest.productQuantity);

  return gRpcCall<FilteredModeProcessList>("getFilteredModeValues", data);

}

export const getAllProcessLogs = (ids: number[]) => {
  const data = new Messages.ProcessLogRequest();  
  data.setIdsList(ids);

  return gRpcCall<ProcessLogList>("getProcessLogs", data);
};

// Sensor
export const getSensorValues = () => {
  const data = new Messages.Empty();

  return gRpcCall<SensorValues>("getSensorValues", data);
};

export const getSensorPinValues = () => {
  const data = new Messages.Empty();

  return gRpcCall<SensorValues>("getSensorPinValues", data);
};

export const getSensorRelayValues = () => {
  const data = new Messages.Empty();

  return gRpcCall<SensorRelayValues>("getSensorRelayValues", data);
}

// State machine
export const getStateMachineValues = () => {
  const data = new Messages.Empty();

  return gRpcCall<StateMachineValues>("getStateMachineValues", data);
};
