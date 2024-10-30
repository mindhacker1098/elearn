import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../../util/connect-mongo";
import QuestionBank from "../../../../models/QuestionBank";



export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo();

  try {

  
    


    const data = await QuestionBank.find({courseid:req.query.id});
  

    if (!data) {
      return res.status(404).json({ error: "Course not found" });
    }


    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
