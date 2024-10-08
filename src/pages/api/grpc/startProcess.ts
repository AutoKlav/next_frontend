// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as gRPC from "@/grpc";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const startProcessRequest = req.body;
  const response = await gRPC.startProcess(startProcessRequest);
  res.status(200).json(response);
}
