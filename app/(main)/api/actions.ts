"use server"

import { createProcessType, deleteProcessType, getAllProcessLogs, getAllProcessTypes, getAllProcesses, getDistinctProcessValues, getFilteredModeValues, getSensorPinValues, getSensorRelayValues, getSensorValues, getStateMachineValues, getStatus, getVariables, setVariable, startProcess, stopProcess, updateSensor } from "@/services/grpc";
import { ProcessInfoFields } from "@/types/app";
import { ProcessConfigMode, ProcessConfigType, ProcessFilterRequest, ProcessTypeRequest, StartProcessRequest, TypeRequest, UpdateSensorRequest } from "@/types/grpc";
import { create } from "domain";

//#region GET Actions

export const getStatusAction = async () => {
    const status = await getStatus();
    return status;
}

export const getStateMachineValuesAction = async () => {
    const states = await getStateMachineValues();
    return states;
}

export const getSensorValuesAction = async () => {
    const sensors = await getSensorValues();
    return sensors;
}

export const getSensorPinValuesAction = async () => {
    const sensors = await getSensorPinValues();
    return sensors;
}

export const getSensorRelayValuesAction = async () => {
    const sensors = await getSensorRelayValues();
    return sensors;
}

export const getVariablesAction = async () => {
    const variables = await getVariables();
    return variables;
}

export const getProcessesAction = async () => {
    const processes = await getAllProcesses();
    return processes;
}

export const getDistinctProcessValuesAction = async (columnName: ProcessInfoFields) => {
    const processValues = await getDistinctProcessValues(columnName);
    return processValues;
}

export const getFilteredModeValuesAction = async (filterModeRequest: ProcessFilterRequest) => {
    const filteredValues = await getFilteredModeValues(filterModeRequest);
    return filteredValues;
}

export const getProcessLogsAction = async ({ids, source} : {ids: number[], source:string}) => {    
    const processLogs = await getAllProcessLogs(ids);    
    return {data: processLogs, source: source};
}

export const getProcessTypesAction = async () => {
    const processTypes = await getAllProcessTypes();    
    return processTypes;
}

// TODO not tested
export const createProcessTypeAction = async (processType: ProcessTypeRequest) => {
    const status = await createProcessType(processType);
    return status;
}

// TODO not tested
export const deleteProcessTypeAction = async (processRequest: TypeRequest) => {
    const status = await deleteProcessType(processRequest);
    return status;
}

//#endregion

//#region POST Actions

export const startProcessAction = async (request: StartProcessRequest) => {
   
    if(request.processConfig.type === ProcessConfigType.STERILIZATION) {        
        request.processConfig.customTemp = 121.1;
        request.processConfig.finishTemp = 121.1;
        request.processConfig.maintainPressure = 1;
        request.processConfig.maintainTemp = 121.1;
    }
    else if(request.processConfig.type === ProcessConfigType.PASTERIZATION) {        
        request.processConfig.customTemp = 70;
        request.processConfig.finishTemp = 70;
        request.processConfig.maintainPressure = 1;
        request.processConfig.maintainTemp = 70;
    }    

    const requestSample: StartProcessRequest = {
        processConfig: {
          customTemp: 0,
          finishTemp: 40,
          maintainPressure: 2,
          maintainTemp: 120,
          mode: ProcessConfigMode.TARGETF,          
          targetTime: 20,
          type: ProcessConfigType.STERILIZATION
        },
        processInfo: {
          bacteria: '',
          description: '',
          processLength: 'Proces nije završen',
          processStart: new Date().toISOString(),
          productName: '',
          targetF: '5',
          productQuantity: ''
        }
      } 
      
      console.log(request);
      const response = await startProcess(requestSample);
      return response;
 };

export const stopProcessAction = async () => {
    const response = await stopProcess();
    return response;
}

export const setVariableAction = async ({ newData, index, variable }: { newData: any; index: number; variable: any }) => {
    const response = await setVariable(variable);
    return {response, newData, index};
}

export const updateSensorAction = async (updateSensorRequest: UpdateSensorRequest) => {
    const response = await updateSensor(updateSensorRequest);
    return response;
}

//#endregion