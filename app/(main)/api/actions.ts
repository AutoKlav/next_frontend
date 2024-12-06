"use server"

import { getAllProcessLogs, getAllProcesses, getSensorPinValues, getSensorRelayValues, getSensorValues, getStateMachineValues, getStatus, getVariables, setVariable, startProcess, stopProcess, updateSensor } from "@/services/grpc";
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

export const getProcessLogsAction = async ({ids, source} : {ids: number[], source:string}) => {    
    const processLogs = await getAllProcessLogs(ids);    
    return {data: processLogs, source: source};
}

//#endregion

//#region POST Actions

export const startProcessAction = async (request: StartProcessRequest) => {
   
    if(request.processConfig.type === ProcessConfigType.STERILIZATION) {
        request.processConfig.targetF = 0.01;
        request.processConfig.customTemp = 121.1;
        request.processConfig.finishTemp = 121.1;
        request.processConfig.maintainPressure = 1;
        request.processConfig.maintainTemp = 121.1;
    }
    else if(request.processConfig.type === ProcessConfigType.PASTERIZATION) {
        request.processConfig.targetF = 0.01;
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
          targetF: 5,
          targetTime: 20,
          type: ProcessConfigType.STERILIZATION
        },
        processInfo: {
          bacteria: 'nulla do laborum laboris labore',
          description: 'reprehenderit magna eiusmod et',
          processLength: 'ex',
          processStart: '2024-01-01T00:00:00',
          productName: 'deserunt enim tempor',
          productQuantity: 'sint aliqua do laborum'
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

export const updateSensorAction = async () => {
    const response = await updateSensor();
    return response;
}

//#endregion