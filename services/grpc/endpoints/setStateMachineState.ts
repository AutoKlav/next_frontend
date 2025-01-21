// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as gRPC from "@/services/grpc";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { variable } = req.body;
  const response = await gRPC.setState(variable);
  res.status(200).json(response);
}
