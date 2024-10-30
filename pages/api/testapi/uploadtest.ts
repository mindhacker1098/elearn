import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../util/connect-mongo";

import tests from "../../../models/Test";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo();
  const data = req.body;

  

  

   const resp= await tests.create(data);

  res.status(200).json({_id:resp._id });
}