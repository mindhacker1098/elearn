import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../../util/connect-mongo";
import courses from "../../../../models/Course";
import { SubTopic,Topic } from "../../../../types/Course";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo();

  try {
    const data = await courses.findById(req.query.id);

    if (!data) {
      return res.status(404).json({ error: "Course not found" });
    }

    const srcList: string[] = [];

    data.topics.forEach((topic:SubTopic) => {
      topic.data.forEach((item: Topic) => {
        srcList.push(item.src);
      });
    });

    res.status(200).json(srcList);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
