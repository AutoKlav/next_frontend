"use server"
import { getStatus } from "@/services/grpc";


export const getStatusAction = async () => {
    const status = await getStatus();
    return status;
}

