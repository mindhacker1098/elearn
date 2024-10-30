import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../util/connect-mongo";

import courses from "../../../models/Course";
import { Course } from "../../../types/Course";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo();
  const data = req.body;
  const course:Course = JSON.parse(data);
  

  

   const resp= await courses.create(course);

  res.status(200).json({_id:resp._id });
}
