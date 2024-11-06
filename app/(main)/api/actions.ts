import { getStateMachineValues, getStatus } from "@/services/grpc";

export const getStatusAction = async () => {
    const status = await getStatus();
    return status;
}

export const stateMachineValuesAction = async () => {
    const state = await getStateMachineValues();
    return state;
}