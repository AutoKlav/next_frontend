import {
  ProcessInfoList,
  SensorValues,
  SetVariable,
  StartProcessRequest,
  StateMachineValues,
  Status,
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
  processInfo.setProcesslength(startProcessRequest.processInfo.processLength);
  data.setProcessinfo(processInfo);

  const processConfig = new Messages.ProcessConfig();
  processConfig.setType(startProcessRequest.processConfig.type);
  processConfig.setCustomtemp(startProcessRequest.processConfig.customTemp);
  processConfig.setMode(startProcessRequest.processConfig.mode);
  processConfig.setTargetf(startProcessRequest.processConfig.targetF);
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

export const getAllProcesses = () => {
  const data = new Messages.Empty();

  return gRpcCall<ProcessInfoList>("getAllProcesses", data);
};

export const getAllProcessLogs = (id: number) => {
  const data = new Messages.ProcessLogRequest();
  data.setId(id);

  return gRpcCall<ProcessInfoList>("getProcessLogs", data);
};

// Sensor
export const getSensorValues = () => {
  const data = new Messages.Empty();

  return gRpcCall<SensorValues>("getSensorValues", data);
};

// State machine
export const getStateMachineValues = () => {
  const data = new Messages.Empty();

  return gRpcCall<StateMachineValues>("getStateMachineValues", data);
};
