import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../util/connect-mongo";

import courses from "../../../models/Course";


export default async function GET(req: NextApiRequest, res: NextApiResponse) {
    await connectMongo();
    try {
        const data = await courses.find({}, { _id: 1, name: 1 }); 
        
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
