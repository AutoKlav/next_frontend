import { GrpcError } from "@/interfaces/grpc";
import { AutoklavClient } from "@/proto/autoklav_grpc_pb";
import { credentials } from "@grpc/grpc-js";

const port = 50061;

const client = new AutoklavClient(
  `localhost:${port}`,
  credentials.createInsecure()
);

export const gRpcCall = <T>(method: string, data: any) => {
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
