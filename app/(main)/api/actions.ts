"use server"

import { createProcessType, deleteProcessType, getAllProcessLogs, getAllProcessTypes, getAllProcesses, getDistinctProcessValues, getFilteredModeValues, getSensorPinValues, getSensorRelayValues, getSensorValues, getStateMachineValues, getStatus, getVariables, setVariable, startProcess, stopProcess, updateSensor, getBacteria } from "@/services/grpc";
import { ProcessInfoFields } from "@/types/app";
import { ProcessFilterRequest, ProcessTypeRequest, StartProcessRequest, TypeRequest, UpdateSensorRequest } from "@/types/grpc";

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

export const getBacteriaAction = async () => {
    const bacteria = await getBacteria();
    return bacteria;
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
      const response = await startProcess(request);
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