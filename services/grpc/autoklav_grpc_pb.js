// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var services_grpc_autoklav_pb = require('../../services/grpc/autoklav_pb.js');

function serialize_autoklav_BacteriaList(arg) {
  if (!(arg instanceof services_grpc_autoklav_pb.BacteriaList)) {
    throw new Error('Expected argument of type autoklav.BacteriaList');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_autoklav_BacteriaList(buffer_arg) {
  return services_grpc_autoklav_pb.BacteriaList.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_autoklav_BacteriaRequest(arg) {
  if (!(arg instanceof services_grpc_autoklav_pb.BacteriaRequest)) {
    throw new Error('Expected argument of type autoklav.BacteriaRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_autoklav_BacteriaRequest(buffer_arg) {
  return services_grpc_autoklav_pb.BacteriaRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_autoklav_Empty(arg) {
  if (!(arg instanceof services_grpc_autoklav_pb.Empty)) {
    throw new Error('Expected argument of type autoklav.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_autoklav_Empty(buffer_arg) {
  return services_grpc_autoklav_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_autoklav_FilteredModeProcessList(arg) {
  if (!(arg instanceof services_grpc_autoklav_pb.FilteredModeProcessList)) {
    throw new Error('Expected argument of type autoklav.FilteredModeProcessList');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_autoklav_FilteredModeProcessList(buffer_arg) {
  return services_grpc_autoklav_pb.FilteredModeProcessList.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_autoklav_FilteredProcessList(arg) {
  if (!(arg instanceof services_grpc_autoklav_pb.FilteredProcessList)) {
    throw new Error('Expected argument of type autoklav.FilteredProcessList');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_autoklav_FilteredProcessList(buffer_arg) {
  return services_grpc_autoklav_pb.FilteredProcessList.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_autoklav_ProcessFilterRequest(arg) {
  if (!(arg instanceof services_grpc_autoklav_pb.ProcessFilterRequest)) {
    throw new Error('Expected argument of type autoklav.ProcessFilterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_autoklav_ProcessFilterRequest(buffer_arg) {
  return services_grpc_autoklav_pb.ProcessFilterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_autoklav_ProcessInfoList(arg) {
  if (!(arg instanceof services_grpc_autoklav_pb.ProcessInfoList)) {
    throw new Error('Expected argument of type autoklav.ProcessInfoList');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_autoklav_ProcessInfoList(buffer_arg) {
  return services_grpc_autoklav_pb.ProcessInfoList.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_autoklav_ProcessLogList(arg) {
  if (!(arg instanceof services_grpc_autoklav_pb.ProcessLogList)) {
    throw new Error('Expected argument of type autoklav.ProcessLogList');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_autoklav_ProcessLogList(buffer_arg) {
  return services_grpc_autoklav_pb.ProcessLogList.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_autoklav_ProcessLogRequest(arg) {
  if (!(arg instanceof services_grpc_autoklav_pb.ProcessLogRequest)) {
    throw new Error('Expected argument of type autoklav.ProcessLogRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_autoklav_ProcessLogRequest(buffer_arg) {
  return services_grpc_autoklav_pb.ProcessLogRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_autoklav_ProcessModeFilterRequest(arg) {
  if (!(arg instanceof services_grpc_autoklav_pb.ProcessModeFilterRequest)) {
    throw new Error('Expected argument of type autoklav.ProcessModeFilterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_autoklav_ProcessModeFilterRequest(buffer_arg) {
  return services_grpc_autoklav_pb.ProcessModeFilterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_autoklav_ProcessTypeRequest(arg) {
  if (!(arg instanceof services_grpc_autoklav_pb.ProcessTypeRequest)) {
    throw new Error('Expected argument of type autoklav.ProcessTypeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_autoklav_ProcessTypeRequest(buffer_arg) {
  return services_grpc_autoklav_pb.ProcessTypeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_autoklav_ProcessTypesList(arg) {
  if (!(arg instanceof services_grpc_autoklav_pb.ProcessTypesList)) {
    throw new Error('Expected argument of type autoklav.ProcessTypesList');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_autoklav_ProcessTypesList(buffer_arg) {
  return services_grpc_autoklav_pb.ProcessTypesList.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_autoklav_SensorRelayValues(arg) {
  if (!(arg instanceof services_grpc_autoklav_pb.SensorRelayValues)) {
    throw new Error('Expected argument of type autoklav.SensorRelayValues');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_autoklav_SensorRelayValues(buffer_arg) {
  return services_grpc_autoklav_pb.SensorRelayValues.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_autoklav_SensorValues(arg) {
  if (!(arg instanceof services_grpc_autoklav_pb.SensorValues)) {
    throw new Error('Expected argument of type autoklav.SensorValues');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_autoklav_SensorValues(buffer_arg) {
  return services_grpc_autoklav_pb.SensorValues.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_autoklav_SetRelay(arg) {
  if (!(arg instanceof services_grpc_autoklav_pb.SetRelay)) {
    throw new Error('Expected argument of type autoklav.SetRelay');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_autoklav_SetRelay(buffer_arg) {
  return services_grpc_autoklav_pb.SetRelay.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_autoklav_SetVariable(arg) {
  if (!(arg instanceof services_grpc_autoklav_pb.SetVariable)) {
    throw new Error('Expected argument of type autoklav.SetVariable');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_autoklav_SetVariable(buffer_arg) {
  return services_grpc_autoklav_pb.SetVariable.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_autoklav_StartProcessRequest(arg) {
  if (!(arg instanceof services_grpc_autoklav_pb.StartProcessRequest)) {
    throw new Error('Expected argument of type autoklav.StartProcessRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_autoklav_StartProcessRequest(buffer_arg) {
  return services_grpc_autoklav_pb.StartProcessRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_autoklav_StateMachineValues(arg) {
  if (!(arg instanceof services_grpc_autoklav_pb.StateMachineValues)) {
    throw new Error('Expected argument of type autoklav.StateMachineValues');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_autoklav_StateMachineValues(buffer_arg) {
  return services_grpc_autoklav_pb.StateMachineValues.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_autoklav_Status(arg) {
  if (!(arg instanceof services_grpc_autoklav_pb.Status)) {
    throw new Error('Expected argument of type autoklav.Status');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_autoklav_Status(buffer_arg) {
  return services_grpc_autoklav_pb.Status.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_autoklav_TypeRequest(arg) {
  if (!(arg instanceof services_grpc_autoklav_pb.TypeRequest)) {
    throw new Error('Expected argument of type autoklav.TypeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_autoklav_TypeRequest(buffer_arg) {
  return services_grpc_autoklav_pb.TypeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_autoklav_UpdateAnalogSensorRequest(arg) {
  if (!(arg instanceof services_grpc_autoklav_pb.UpdateAnalogSensorRequest)) {
    throw new Error('Expected argument of type autoklav.UpdateAnalogSensorRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_autoklav_UpdateAnalogSensorRequest(buffer_arg) {
  return services_grpc_autoklav_pb.UpdateAnalogSensorRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_autoklav_Variables(arg) {
  if (!(arg instanceof services_grpc_autoklav_pb.Variables)) {
    throw new Error('Expected argument of type autoklav.Variables');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_autoklav_Variables(buffer_arg) {
  return services_grpc_autoklav_pb.Variables.deserializeBinary(new Uint8Array(buffer_arg));
}


var AutoklavService = exports.AutoklavService = {
  // Status
getStatus: {
    path: '/autoklav.Autoklav/getStatus',
    requestStream: false,
    responseStream: false,
    requestType: services_grpc_autoklav_pb.Empty,
    responseType: services_grpc_autoklav_pb.Status,
    requestSerialize: serialize_autoklav_Empty,
    requestDeserialize: deserialize_autoklav_Empty,
    responseSerialize: serialize_autoklav_Status,
    responseDeserialize: deserialize_autoklav_Status,
  },
  // Global variables
getVariables: {
    path: '/autoklav.Autoklav/getVariables',
    requestStream: false,
    responseStream: false,
    requestType: services_grpc_autoklav_pb.Empty,
    responseType: services_grpc_autoklav_pb.Variables,
    requestSerialize: serialize_autoklav_Empty,
    requestDeserialize: deserialize_autoklav_Empty,
    responseSerialize: serialize_autoklav_Variables,
    responseDeserialize: deserialize_autoklav_Variables,
  },
  setVariable: {
    path: '/autoklav.Autoklav/setVariable',
    requestStream: false,
    responseStream: false,
    requestType: services_grpc_autoklav_pb.SetVariable,
    responseType: services_grpc_autoklav_pb.Status,
    requestSerialize: serialize_autoklav_SetVariable,
    requestDeserialize: deserialize_autoklav_SetVariable,
    responseSerialize: serialize_autoklav_Status,
    responseDeserialize: deserialize_autoklav_Status,
  },
  // Process
getAllProcesses: {
    path: '/autoklav.Autoklav/getAllProcesses',
    requestStream: false,
    responseStream: false,
    requestType: services_grpc_autoklav_pb.Empty,
    responseType: services_grpc_autoklav_pb.ProcessInfoList,
    requestSerialize: serialize_autoklav_Empty,
    requestDeserialize: deserialize_autoklav_Empty,
    responseSerialize: serialize_autoklav_ProcessInfoList,
    responseDeserialize: deserialize_autoklav_ProcessInfoList,
  },
  getDistinctProcessValues: {
    path: '/autoklav.Autoklav/getDistinctProcessValues',
    requestStream: false,
    responseStream: false,
    requestType: services_grpc_autoklav_pb.ProcessFilterRequest,
    responseType: services_grpc_autoklav_pb.FilteredProcessList,
    requestSerialize: serialize_autoklav_ProcessFilterRequest,
    requestDeserialize: deserialize_autoklav_ProcessFilterRequest,
    responseSerialize: serialize_autoklav_FilteredProcessList,
    responseDeserialize: deserialize_autoklav_FilteredProcessList,
  },
  getUniqueProcesses: {
    path: '/autoklav.Autoklav/getUniqueProcesses',
    requestStream: false,
    responseStream: false,
    requestType: services_grpc_autoklav_pb.Empty,
    responseType: services_grpc_autoklav_pb.ProcessInfoList,
    requestSerialize: serialize_autoklav_Empty,
    requestDeserialize: deserialize_autoklav_Empty,
    responseSerialize: serialize_autoklav_ProcessInfoList,
    responseDeserialize: deserialize_autoklav_ProcessInfoList,
  },
  getFilteredModeValues: {
    path: '/autoklav.Autoklav/getFilteredModeValues',
    requestStream: false,
    responseStream: false,
    requestType: services_grpc_autoklav_pb.ProcessModeFilterRequest,
    responseType: services_grpc_autoklav_pb.FilteredModeProcessList,
    requestSerialize: serialize_autoklav_ProcessModeFilterRequest,
    requestDeserialize: deserialize_autoklav_ProcessModeFilterRequest,
    responseSerialize: serialize_autoklav_FilteredModeProcessList,
    responseDeserialize: deserialize_autoklav_FilteredModeProcessList,
  },
  getProcessLogs: {
    path: '/autoklav.Autoklav/getProcessLogs',
    requestStream: false,
    responseStream: false,
    requestType: services_grpc_autoklav_pb.ProcessLogRequest,
    responseType: services_grpc_autoklav_pb.ProcessLogList,
    requestSerialize: serialize_autoklav_ProcessLogRequest,
    requestDeserialize: deserialize_autoklav_ProcessLogRequest,
    responseSerialize: serialize_autoklav_ProcessLogList,
    responseDeserialize: deserialize_autoklav_ProcessLogList,
  },
  getAllProcessTypes: {
    path: '/autoklav.Autoklav/getAllProcessTypes',
    requestStream: false,
    responseStream: false,
    requestType: services_grpc_autoklav_pb.Empty,
    responseType: services_grpc_autoklav_pb.ProcessTypesList,
    requestSerialize: serialize_autoklav_Empty,
    requestDeserialize: deserialize_autoklav_Empty,
    responseSerialize: serialize_autoklav_ProcessTypesList,
    responseDeserialize: deserialize_autoklav_ProcessTypesList,
  },
  createProcessType: {
    path: '/autoklav.Autoklav/createProcessType',
    requestStream: false,
    responseStream: false,
    requestType: services_grpc_autoklav_pb.ProcessTypeRequest,
    responseType: services_grpc_autoklav_pb.Status,
    requestSerialize: serialize_autoklav_ProcessTypeRequest,
    requestDeserialize: deserialize_autoklav_ProcessTypeRequest,
    responseSerialize: serialize_autoklav_Status,
    responseDeserialize: deserialize_autoklav_Status,
  },
  deleteProcessType: {
    path: '/autoklav.Autoklav/deleteProcessType',
    requestStream: false,
    responseStream: false,
    requestType: services_grpc_autoklav_pb.TypeRequest,
    responseType: services_grpc_autoklav_pb.Status,
    requestSerialize: serialize_autoklav_TypeRequest,
    requestDeserialize: deserialize_autoklav_TypeRequest,
    responseSerialize: serialize_autoklav_Status,
    responseDeserialize: deserialize_autoklav_Status,
  },
  deleteProcess: {
    path: '/autoklav.Autoklav/deleteProcess',
    requestStream: false,
    responseStream: false,
    requestType: services_grpc_autoklav_pb.TypeRequest,
    responseType: services_grpc_autoklav_pb.Status,
    requestSerialize: serialize_autoklav_TypeRequest,
    requestDeserialize: deserialize_autoklav_TypeRequest,
    responseSerialize: serialize_autoklav_Status,
    responseDeserialize: deserialize_autoklav_Status,
  },
  startProcess: {
    path: '/autoklav.Autoklav/startProcess',
    requestStream: false,
    responseStream: false,
    requestType: services_grpc_autoklav_pb.StartProcessRequest,
    responseType: services_grpc_autoklav_pb.Status,
    requestSerialize: serialize_autoklav_StartProcessRequest,
    requestDeserialize: deserialize_autoklav_StartProcessRequest,
    responseSerialize: serialize_autoklav_Status,
    responseDeserialize: deserialize_autoklav_Status,
  },
  stopProcess: {
    path: '/autoklav.Autoklav/stopProcess',
    requestStream: false,
    responseStream: false,
    requestType: services_grpc_autoklav_pb.Empty,
    responseType: services_grpc_autoklav_pb.Status,
    requestSerialize: serialize_autoklav_Empty,
    requestDeserialize: deserialize_autoklav_Empty,
    responseSerialize: serialize_autoklav_Status,
    responseDeserialize: deserialize_autoklav_Status,
  },
  // Sensor
getSensorPinValues: {
    path: '/autoklav.Autoklav/getSensorPinValues',
    requestStream: false,
    responseStream: false,
    requestType: services_grpc_autoklav_pb.Empty,
    responseType: services_grpc_autoklav_pb.SensorValues,
    requestSerialize: serialize_autoklav_Empty,
    requestDeserialize: deserialize_autoklav_Empty,
    responseSerialize: serialize_autoklav_SensorValues,
    responseDeserialize: deserialize_autoklav_SensorValues,
  },
  getSensorRelayValues: {
    path: '/autoklav.Autoklav/getSensorRelayValues',
    requestStream: false,
    responseStream: false,
    requestType: services_grpc_autoklav_pb.Empty,
    responseType: services_grpc_autoklav_pb.SensorRelayValues,
    requestSerialize: serialize_autoklav_Empty,
    requestDeserialize: deserialize_autoklav_Empty,
    responseSerialize: serialize_autoklav_SensorRelayValues,
    responseDeserialize: deserialize_autoklav_SensorRelayValues,
  },
  updateAnalogSensor: {
    path: '/autoklav.Autoklav/updateAnalogSensor',
    requestStream: false,
    responseStream: false,
    requestType: services_grpc_autoklav_pb.UpdateAnalogSensorRequest,
    responseType: services_grpc_autoklav_pb.Status,
    requestSerialize: serialize_autoklav_UpdateAnalogSensorRequest,
    requestDeserialize: deserialize_autoklav_UpdateAnalogSensorRequest,
    responseSerialize: serialize_autoklav_Status,
    responseDeserialize: deserialize_autoklav_Status,
  },
  // Bacteria
getBacteria: {
    path: '/autoklav.Autoklav/getBacteria',
    requestStream: false,
    responseStream: false,
    requestType: services_grpc_autoklav_pb.Empty,
    responseType: services_grpc_autoklav_pb.BacteriaList,
    requestSerialize: serialize_autoklav_Empty,
    requestDeserialize: deserialize_autoklav_Empty,
    responseSerialize: serialize_autoklav_BacteriaList,
    responseDeserialize: deserialize_autoklav_BacteriaList,
  },
  createBacteria: {
    path: '/autoklav.Autoklav/createBacteria',
    requestStream: false,
    responseStream: false,
    requestType: services_grpc_autoklav_pb.BacteriaRequest,
    responseType: services_grpc_autoklav_pb.Status,
    requestSerialize: serialize_autoklav_BacteriaRequest,
    requestDeserialize: deserialize_autoklav_BacteriaRequest,
    responseSerialize: serialize_autoklav_Status,
    responseDeserialize: deserialize_autoklav_Status,
  },
  deleteBacteria: {
    path: '/autoklav.Autoklav/deleteBacteria',
    requestStream: false,
    responseStream: false,
    requestType: services_grpc_autoklav_pb.TypeRequest,
    responseType: services_grpc_autoklav_pb.Status,
    requestSerialize: serialize_autoklav_TypeRequest,
    requestDeserialize: deserialize_autoklav_TypeRequest,
    responseSerialize: serialize_autoklav_Status,
    responseDeserialize: deserialize_autoklav_Status,
  },
  // StateMachine
getStateMachineValues: {
    path: '/autoklav.Autoklav/getStateMachineValues',
    requestStream: false,
    responseStream: false,
    requestType: services_grpc_autoklav_pb.Empty,
    responseType: services_grpc_autoklav_pb.StateMachineValues,
    requestSerialize: serialize_autoklav_Empty,
    requestDeserialize: deserialize_autoklav_Empty,
    responseSerialize: serialize_autoklav_StateMachineValues,
    responseDeserialize: deserialize_autoklav_StateMachineValues,
  },
  setRelayStatus: {
    path: '/autoklav.Autoklav/setRelayStatus',
    requestStream: false,
    responseStream: false,
    requestType: services_grpc_autoklav_pb.SetRelay,
    responseType: services_grpc_autoklav_pb.Status,
    requestSerialize: serialize_autoklav_SetRelay,
    requestDeserialize: deserialize_autoklav_SetRelay,
    responseSerialize: serialize_autoklav_Status,
    responseDeserialize: deserialize_autoklav_Status,
  },
};

exports.AutoklavClient = grpc.makeGenericClientConstructor(AutoklavService);
