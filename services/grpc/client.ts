import { GrpcError } from "@/types/grpc";
import { AutoklavClient } from "@/services/grpc/autoklav_grpc_pb";
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
        console.log(err.message);
        reject(err);
      }      
      
      // In case of failure, the error will be caught by the try/catch block and build won't fail
      try
      {
        const responseObj = response.toObject();
        resolve(responseObj);
      } catch (error) {
        console.log(error);
        reject(error);
      };      

    });
  });
};

export default client;
