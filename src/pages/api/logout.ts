import { withSessionRoute } from "@/lib/withSession";
import { NextApiRequest, NextApiResponse } from "next";

const VALID_USERNAME = "admin";
const VALID_PASSWORD = "autoklav";

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy();
  res.send({ ok: true });
}
