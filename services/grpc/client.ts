import { GrpcError } from "@/types/grpc";
import { AutoklavClient } from "@/services/grpc/autoklav_grpc_pb";
import { credentials } from "@grpc/grpc-js";

const port = 50061;

const client = new AutoklavClient(
  `localhost:${port}`,
  credentials.createInsecure()
);

export const gRpcCall = <T>(method: string, data: any) => {
  console.log(`gRpcCall invoked. Method: ${method}, Data:`, data);
  return new Promise<T>((resolve, reject) => {
    client[method](data, (err: GrpcError, response: any) => {
      if (err) {
        reject(err);
      }
      resolve(response.toObject());
    });
  });
};

export default client;
