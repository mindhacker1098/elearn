import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../util/connect-mongo";

import courses from "../../../models/Course";
import { Course } from "../../../types/Course";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
    await connectMongo();
    const data = await courses.find();
    res.status(200).json(data);
  }
  