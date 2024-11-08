"use server"

import { getStateMachineValues, getStatus, getVariables, setVariable, stopProcess } from "@/services/grpc";
import { SetVariable } from "@/types/grpc";

export const getStatusAction = async () => {
    const status = await getStatus();
    return status;
}

export const getStateMachineValuesAction = async () => {
    const states = await getStateMachineValues();
    return states;
}

export const getVariablesAction = async () => {
    const variables = await getVariables();
    return variables;
}

export const stopProcessAction = async () => {
    const response = await stopProcess();
    return response;
}

export const setVariableAction = async (data: SetVariable) => {
    const response = await setVariable(data);
    return response;
}