import {
  BacteriaList,
  BacteriaRequest,
  FilteredModeProcessList,
  FilteredProcessList,
  ProcessFilterRequest,
  ProcessInfoList,
  ProcessList,
  ProcessLogList,
  ProcessTypeRequest,
  ProcessTypesResponse,
  SensorRelayValues,
  SensorValues,
  SetVariable,
  StartProcessRequest,
  StateMachineValues,
  Status,
  TypeRequest,
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

export const setRelayStatus = (setVariable: SetVariable) => {
  const data = new Messages.SetVariable();
  data.setName(setVariable.name);
  data.setValue(setVariable.value);

  return gRpcCall<Status>("setRelayStatus", data);
}

export const setState = (state: string) => {
  const data = new Messages.SetState();
  data.setState(state);  

  return gRpcCall<Status>("setStateMachineState", data);
}

// Process
export const startProcess = (startProcessRequest: StartProcessRequest) => {
  const data = new Messages.StartProcessRequest();
  const processInfo = new Messages.ProcessInfo();

  // Create an instance of the Bacteria message
const bacteria = new Messages.Bacteria();
    bacteria.setId(startProcessRequest.processInfo.bacteria.id);
    bacteria.setName(startProcessRequest.processInfo.bacteria.name);
    bacteria.setDescription(startProcessRequest.processInfo.bacteria.description);
    bacteria.setD0(startProcessRequest.processInfo.bacteria.d0);
    bacteria.setZ(startProcessRequest.processInfo.bacteria.z);

  processInfo.setProductname(startProcessRequest.processInfo.productName);
  processInfo.setProductquantity(
    startProcessRequest.processInfo.productQuantity
  );
  processInfo.setBacteria(bacteria);
  processInfo.setProcessstart(startProcessRequest.processInfo.processStart);
  processInfo.setTargetf(startProcessRequest.processInfo.targetF);
  processInfo.setProcesslength(startProcessRequest.processInfo.processLength);
  processInfo.setTargetheatingtime(startProcessRequest.processInfo.targetHeatingTime);
  processInfo.setTargetcoolingtime(startProcessRequest.processInfo.targetCoolingTime);
  data.setProcessinfo(processInfo);

  const processConfig = new Messages.ProcessConfig();

  
  // Create and set ProcessType
  const processType = new Messages.ProcessType();
  processType.setId(startProcessRequest.processConfig.processType.id);
  processType.setName(startProcessRequest.processConfig.processType.name);
  processType.setCustomtemp(startProcessRequest.processConfig.processType.customtemp);
  processType.setFinishtemp(startProcessRequest.processConfig.processType.finishtemp);
  processType.setMaintaintemp(startProcessRequest.processConfig.processType.maintaintemp);

  processConfig.setProcesstype(startProcessRequest.processConfig.processType);
  processConfig.setHeatingtype(startProcessRequest.processConfig.heatingType);
  processConfig.setMode(startProcessRequest.processConfig.mode);
  
  data.setProcessconfig(processConfig);

  return gRpcCall<Status>("startProcess", data);
};

export const stopProcess = () => {
  const data = new Messages.Empty();

  return gRpcCall<Status>("stopProcess", data);
};

export const startManualProcess = () => {
  const data = new Messages.StartProcessRequest();

  return gRpcCall<Status>("startManualProcess", data);
};

export const stopManualProcess = () => {
  const data = new Messages.Empty();

  return gRpcCall<Status>("stopManualProcess", data);
};

export const relayTest = () => {
  const data = new Messages.Empty();

  return gRpcCall<Status>("relayTest", data);
};

export const updateSensor = (updateSensorRequest: UpdateSensorRequest) => {
  const data = new Messages.UpdateSensorRequest();
  data.setName(updateSensorRequest.name);
  data.setMinvalue(updateSensorRequest.minValue);
  data.setMaxvalue(updateSensorRequest.maxValue);

  return gRpcCall<Status>("updateSensor", data);
}

export const createProcessType = (processRequest: ProcessTypeRequest) => {
  const data = new Messages.ProcessTypeRequest();
  data.setName(processRequest.name);
  data.setType(processRequest.type);
  data.setCustomtemp(processRequest.customTemp);
  data.setFinishtemp(processRequest.finishTemp);  
  data.setPressure(processRequest.pressure);

  return gRpcCall<Status>("createProcessType", data);
}

export const createBacteria = (bacteriaRequest: BacteriaRequest) => {
  const data = new Messages.BacteriaRequest();
  data.setName(bacteriaRequest.name);
  data.setDescription(bacteriaRequest.description);
  data.setD0(bacteriaRequest.d0);
  data.setZ(bacteriaRequest.z);

  return gRpcCall<Status>("createBacteria", data);
}

export const deleteProcessType = (typeRequest: TypeRequest) => {
  const data = new Messages.TypeRequest();
  data.setId(typeRequest.id);

  return gRpcCall<Status>("deleteProcessType", data);
}

export const deleteBacteria = (typeRequest: TypeRequest) => {
  const data = new Messages.TypeRequest();
  data.setId(typeRequest.id);

  return gRpcCall<Status>("deleteBacteria", data);
}

export const deleteProcess = (typeRequest: TypeRequest) => {
  const data = new Messages.TypeRequest();
  data.setId(typeRequest.id);

  return gRpcCall<Status>("deleteProcess", data);
}

export const getAllProcesses = () => {
  const data = new Messages.Empty();

  return gRpcCall<ProcessInfoList>("getAllProcesses", data);
};

export const getUniqueProcesses = () => {
  const data = new Messages.Empty();

  return gRpcCall<ProcessList>("getUniqueProcesses", data);
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

export const getBacteria = () => {
  const data = new Messages.Empty();

  return gRpcCall<BacteriaList>("getBacteria", data);
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
