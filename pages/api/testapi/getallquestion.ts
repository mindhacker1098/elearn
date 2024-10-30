import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../util/connect-mongo";

import questions from "../../../models/QuestionBank";


export default async function GET(req: NextApiRequest, res: NextApiResponse) {
    await connectMongo();
    try {
        const data = await questions.find({}); 
        
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
