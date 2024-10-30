import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../util/connect-mongo";

import quizs from "../../../models/Quiz";
import { Course } from "../../../types/Course";
import { Quiz } from "../../../types/Quiz";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo();
  const data = req.body;
  const course:Quiz = data;
  

  
console.log(course)
   const resp:Course= await quizs.create(course);
  
  res.status(200).json({messg:"uploaded sucessfully" });
}
