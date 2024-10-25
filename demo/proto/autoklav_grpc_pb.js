// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var proto_autoklav_pb = require('../proto/autoklav_pb.js');

function serialize_Autoklav_Empty(arg) {
  if (!(arg instanceof proto_autoklav_pb.Empty)) {
    throw new Error('Expected argument of type Autoklav.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Autoklav_Empty(buffer_arg) {
  return proto_autoklav_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Autoklav_SensorValues(arg) {
  if (!(arg instanceof proto_autoklav_pb.SensorValues)) {
    throw new Error('Expected argument of type Autoklav.SensorValues');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Autoklav_SensorValues(buffer_arg) {
  return proto_autoklav_pb.SensorValues.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Autoklav_SetVariable(arg) {
  if (!(arg instanceof proto_autoklav_pb.SetVariable)) {
    throw new Error('Expected argument of type Autoklav.SetVariable');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Autoklav_SetVariable(buffer_arg) {
  return proto_autoklav_pb.SetVariable.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Autoklav_StartProcessRequest(arg) {
  if (!(arg instanceof proto_autoklav_pb.StartProcessRequest)) {
    throw new Error('Expected argument of type Autoklav.StartProcessRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Autoklav_StartProcessRequest(buffer_arg) {
  return proto_autoklav_pb.StartProcessRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Autoklav_StateMachineValues(arg) {
  if (!(arg instanceof proto_autoklav_pb.StateMachineValues)) {
    throw new Error('Expected argument of type Autoklav.StateMachineValues');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Autoklav_StateMachineValues(buffer_arg) {
  return proto_autoklav_pb.StateMachineValues.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Autoklav_Status(arg) {
  if (!(arg instanceof proto_autoklav_pb.Status)) {
    throw new Error('Expected argument of type Autoklav.Status');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Autoklav_Status(buffer_arg) {
  return proto_autoklav_pb.Status.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Autoklav_Variables(arg) {
  if (!(arg instanceof proto_autoklav_pb.Variables)) {
    throw new Error('Expected argument of type Autoklav.Variables');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Autoklav_Variables(buffer_arg) {
  return proto_autoklav_pb.Variables.deserializeBinary(new Uint8Array(buffer_arg));
}


var AutoklavService = exports.AutoklavService = {
  // Status
getStatus: {
    path: '/Autoklav.Autoklav/getStatus',
    requestStream: false,
    responseStream: false,
    requestType: proto_autoklav_pb.Empty,
    responseType: proto_autoklav_pb.Status,
    requestSerialize: serialize_Autoklav_Empty,
    requestDeserialize: deserialize_Autoklav_Empty,
    responseSerialize: serialize_Autoklav_Status,
    responseDeserialize: deserialize_Autoklav_Status,
  },
  // Global variables
getVariables: {
    path: '/Autoklav.Autoklav/getVariables',
    requestStream: false,
    responseStream: false,
    requestType: proto_autoklav_pb.Empty,
    responseType: proto_autoklav_pb.Variables,
    requestSerialize: serialize_Autoklav_Empty,
    requestDeserialize: deserialize_Autoklav_Empty,
    responseSerialize: serialize_Autoklav_Variables,
    responseDeserialize: deserialize_Autoklav_Variables,
  },
  setVariable: {
    path: '/Autoklav.Autoklav/setVariable',
    requestStream: false,
    responseStream: false,
    requestType: proto_autoklav_pb.SetVariable,
    responseType: proto_autoklav_pb.Status,
    requestSerialize: serialize_Autoklav_SetVariable,
    requestDeserialize: deserialize_Autoklav_SetVariable,
    responseSerialize: serialize_Autoklav_Status,
    responseDeserialize: deserialize_Autoklav_Status,
  },
  // Process
startProcess: {
    path: '/Autoklav.Autoklav/startProcess',
    requestStream: false,
    responseStream: false,
    requestType: proto_autoklav_pb.StartProcessRequest,
    responseType: proto_autoklav_pb.Status,
    requestSerialize: serialize_Autoklav_StartProcessRequest,
    requestDeserialize: deserialize_Autoklav_StartProcessRequest,
    responseSerialize: serialize_Autoklav_Status,
    responseDeserialize: deserialize_Autoklav_Status,
  },
  stopProcess: {
    path: '/Autoklav.Autoklav/stopProcess',
    requestStream: false,
    responseStream: false,
    requestType: proto_autoklav_pb.Empty,
    responseType: proto_autoklav_pb.Status,
    requestSerialize: serialize_Autoklav_Empty,
    requestDeserialize: deserialize_Autoklav_Empty,
    responseSerialize: serialize_Autoklav_Status,
    responseDeserialize: deserialize_Autoklav_Status,
  },
  // Sensor
getSensorValues: {
    path: '/Autoklav.Autoklav/getSensorValues',
    requestStream: false,
    responseStream: false,
    requestType: proto_autoklav_pb.Empty,
    responseType: proto_autoklav_pb.SensorValues,
    requestSerialize: serialize_Autoklav_Empty,
    requestDeserialize: deserialize_Autoklav_Empty,
    responseSerialize: serialize_Autoklav_SensorValues,
    responseDeserialize: deserialize_Autoklav_SensorValues,
  },
  // StateMachine
getStateMachineValues: {
    path: '/Autoklav.Autoklav/getStateMachineValues',
    requestStream: false,
    responseStream: false,
    requestType: proto_autoklav_pb.Empty,
    responseType: proto_autoklav_pb.StateMachineValues,
    requestSerialize: serialize_Autoklav_Empty,
    requestDeserialize: deserialize_Autoklav_Empty,
    responseSerialize: serialize_Autoklav_StateMachineValues,
    responseDeserialize: deserialize_Autoklav_StateMachineValues,
  },
};

exports.AutoklavClient = grpc.makeGenericClientConstructor(AutoklavService);
