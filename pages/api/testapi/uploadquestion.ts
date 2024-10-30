import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../util/connect-mongo";

import questionbanks from "../../../models/QuestionBank";
import { Question } from "../../../types/Question";


export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo();
  const data = req.body;
  const questionslist:Question[] = data.questions;
  

  
console.log(questionslist)
   

   for (const course of questionslist) {
    // await courses.create(course);
    await questionbanks.create(course);

  }
//   await questionbanks.create( {
//     no: "1",
//     text: "What is the capital of France?",
//     options: ["London", "Paris", "Berlin", "Rome"],
//     answer: "Paris",
//     courseid: "123456",
//     topicid: "789012"
// }
// );
  res.status(200).json({messg:"uploaded sucessfully" });
}
