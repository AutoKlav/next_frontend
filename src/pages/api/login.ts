import { withSessionRoute } from "@/lib/withSession";
import { VALID_PASSWORD, VALID_USERNAME } from "@/utils/const";
import { NextApiRequest, NextApiResponse } from "next";

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(404).send("");

  const { username, password } = req.body;

  if (username !== VALID_USERNAME || password !== VALID_PASSWORD)
    return res.status(403).send("");

  req.session.user = {
    admin: true,
  };
  await req.session.save();

  return res.send({ ok: true });
}
