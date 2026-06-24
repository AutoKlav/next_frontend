import { GrpcError } from "@/types/grpc";
import { AutoklavClient } from "@/services/grpc/autoklav_grpc_pb";
import { credentials } from "@grpc/grpc-js";

const port = 50061;

const client = new AutoklavClient(
  `localhost:${port}`,
  credentials.createInsecure()
);

export const gRpcCall = <T>(method: string, data: any) => {
  // Reject is avoided to prevent the app from crashing, every error is handled in the response
  return new Promise<T>((resolve, reject) => {
    if (typeof (client as any)[method] !== "function") {
      // Missing method means the generated stubs are stale for this RPC — surface it as data
      resolve({ errorsstring: `RPC '${method}' missing from generated client — run bun proto:generate` } as T);
      return;
    }
    client[method](data, (err: GrpcError, response: any) => {
      try {
        response = err ? { errorsstring: err.message } : response.toObject();
        resolve(response as T);
      } catch (e) {
        console.log(e);
        resolve({ errorsstring: "Error in gRpcCall, this shouldn't happen" } as T);
      }
    });
  });
};

export default client;
