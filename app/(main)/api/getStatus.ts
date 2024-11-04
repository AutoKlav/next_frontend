import type { NextApiRequest, NextApiResponse } from "next";
import { AutoklavClient } from "@/services/grpc/autoklav_grpc_pb";
import { credentials } from "@grpc/grpc-js";

const client = new AutoklavClient("localhost:50061", credentials.createInsecure());

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Testing gRPC call directly in API route...");

  client.getStatus({}, (err:any, response:any) => {
    if (err) {
      console.error("Error calling gRPC in API route:", err);
      return res.status(500).json({ error: "Failed to fetch status" });
    }

    console.log("Direct gRPC response:", response);
    res.status(200).json(response.toObject());
  });
}
