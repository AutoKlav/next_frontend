// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as gRPC from "@/demo/components/grpc";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await gRPC.getVariables();
  res.status(200).json(response);
}
