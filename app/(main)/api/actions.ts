import { getStateMachineValues, getStatus, getVariables, stopProcess } from "@/services/grpc";

export const getStatusAction = async () => {
    const status = await getStatus();
    return status;
}

export const getStateMachineValuesAction = async () => {
    const state = await getStateMachineValues();
    return state;
}

export const getVariablesAction = async () => {
    const variables = await getVariables();
    return variables;
}

export const stopProcessAction = async () => {
    //const response = await stopProcess();
    //console.log(response);
    console.log('stopProcessAction');
    //return response;
}