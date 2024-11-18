"use server"

import { getAllProcessLogs, getAllProcesses, getSensorValues, getStateMachineValues, getStatus, getVariables, setVariable, startProcess, stopProcess } from "@/services/grpc";
import { ProcessConfigMode, ProcessConfigType, StartProcessRequest } from "@/types/grpc";

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

export const getVariablesAction = async () => {
    const variables = await getVariables();
    return variables;
}

export const getProcessesAction = async () => {
    const processes = await getAllProcesses();
    return processes;
}

export const getProcessLogsAction = async (ids: number[]) => {
    const processLogs = await getAllProcessLogs(ids);
    return processLogs;
}

//#endregion

//#region POST Actions

export const startProcessAction = async () => {
    const request: StartProcessRequest = {
        processConfig: {
          customTemp: 0,
          finishTemp: 40,
          maintainPressure: 2,
          maintainTemp: 120,
          mode: ProcessConfigMode.TARGETF,
          targetF: 5,
          targetTime: 20,
          type: ProcessConfigType.STERILIZATION
        },
        processInfo: {
          bacteria: 'nulla do laborum laboris labore',
          description: 'reprehenderit magna eiusmod et',
          processLength: 'ex',
          processStart: 'est sit',
          productName: 'deserunt enim tempor',
          productQuantity: 'sint aliqua do laborum'
        }
      } 
      
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

//TODO
export const emergencyStopAction = async () => {
    //const response = await stopProcess();
    //return response;
}

//#endregion