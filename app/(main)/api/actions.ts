import { getStateMachineValues, getStatus, getVariables } from "@/services/grpc";

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