import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../../../util/connect-mongo";
import QuestionBank from "../../../../../models/QuestionBank";
import User from "../../../../../models/User";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo();

  try {
    const requestedNo = parseInt(req.query.id as string); // Convert the string to number
    const user = await User.findOne({ army_no: req.query.id1 });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const totalQuestions = await QuestionBank.countDocuments({ courseid: user.courseid });

    if (totalQuestions === 0) {
      return res.status(404).json({ error: "No questions found for the given course" });
    }

    let actualNo = requestedNo; // Initialize actual number with requested number

    if (totalQuestions < requestedNo) {
      actualNo = totalQuestions; // If there are fewer questions available, fetch the maximum available
    }

    const data = await QuestionBank.aggregate([
      { $match: { courseid: user.courseid } }, // Match documents with the given courseid
      { $sample: { size: actualNo } } // Randomly select 'actualNo' documents
    ]);

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "No questions found for the given course" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
