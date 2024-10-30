import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../util/connect-mongo";

import courses from "../../../models/Course";
import { Course } from "../../../types/Course";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo();
  const Courses: Course[] = req.body;
  await courses.deleteMany()

  for (const course of Courses) {
    await courses.create(course);
  }

  res.status(200).json({ message: "Course added successfully" });
}
