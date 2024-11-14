"use server"

import { getAllProcessLogs, getAllProcesses, getSensorValues, getStateMachineValues, getStatus, getVariables, setVariable, stopProcess } from "@/services/grpc";
import { SetVariable } from "@/types/grpc";

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

export const stopProcessAction = async () => {
    const response = await stopProcess();
    return response;
}

export const setVariableAction = async ({ newData, index, variable }: { newData: any; index: number; variable: any }) => {
    const response = await setVariable(variable);
    return {response, newData, index};
}

//#endregion