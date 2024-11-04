// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as gRPC from "@/services/grpc";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await gRPC.getSensorValues();
  res.status(200).json(response);
}
