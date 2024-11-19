// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var services_grpc_autoklav_pb = require('../../services/grpc/autoklav_pb.js');

function serialize_autoklav_Empty(arg) {
  if (!(arg instanceof services_grpc_autoklav_pb.Empty)) {
    throw new Error('Expected argument of type autoklav.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_autoklav_Empty(buffer_arg) {
  return services_grpc_autoklav_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_autoklav_SensorValues(arg) {
  if (!(arg instanceof services_grpc_autoklav_pb.SensorValues)) {
    throw new Error('Expected argument of type autoklav.SensorValues');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_autoklav_SensorValues(buffer_arg) {
  return services_grpc_autoklav_pb.SensorValues.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_autoklav_UpdateSensorRequest(arg) {
  if (!(arg instanceof services_grpc_autoklav_pb.UpdateSensorRequest)) {
    throw new Error('Expected argument of type autoklav.UpdateSensorRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_autoklav_UpdateSensorRequest(buffer_arg) {
  return services_grpc_autoklav_pb.UpdateSensorRequest.deserializeBinary(new Uint8Array(buffer_arg));
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
getSensorValues: {
    path: '/autoklav.Autoklav/getSensorValues',
    requestStream: false,
    responseStream: false,
    requestType: services_grpc_autoklav_pb.Empty,
    responseType: services_grpc_autoklav_pb.SensorValues,
    requestSerialize: serialize_autoklav_Empty,
    requestDeserialize: deserialize_autoklav_Empty,
    responseSerialize: serialize_autoklav_SensorValues,
    responseDeserialize: deserialize_autoklav_SensorValues,
  },
  updateSensor: {
    path: '/autoklav.Autoklav/updateSensor',
    requestStream: false,
    responseStream: false,
    requestType: services_grpc_autoklav_pb.UpdateSensorRequest,
    responseType: services_grpc_autoklav_pb.Status,
    requestSerialize: serialize_autoklav_UpdateSensorRequest,
    requestDeserialize: deserialize_autoklav_UpdateSensorRequest,
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
};

exports.AutoklavClient = grpc.makeGenericClientConstructor(AutoklavService);
