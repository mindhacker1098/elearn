import { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../../util/connect-mongo";
import Test from "../../../../models/Test";
import User from "../../../../models/User";

function parseDurationToMilliseconds(duration: string): number {
  const durationRegex = /(\d+h)?\s*(\d+m)?/;
  const matches = duration.match(durationRegex);

  let hours = 0;
  let minutes = 0;

  if (matches && matches.length >= 3) {
    const hoursMatch = matches[1];
    const minutesMatch = matches[2];

    if (hoursMatch) {
      hours = parseInt(hoursMatch.slice(0, -1)); 
    }

    if (minutesMatch) {
      minutes = parseInt(minutesMatch.slice(0, -1)); 
    }
  }

  const hoursInMilliseconds = hours * 60 * 60 * 1000;
  const minutesInMilliseconds = minutes * 60 * 1000;

  return hoursInMilliseconds + minutesInMilliseconds;
}

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo();

  try {
    const user = await User.findOne({ army_no: req.query.id });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const currentDate = new Date();

    const tests = await Test.find({ courseId: user.courseid });

    const upcomingAndOngoingTests = tests.filter((test) => {
      const testStartTime = new Date(test.date + "T" + test.startTime);
      const testEndTime = new Date(testStartTime.getTime() + parseDurationToMilliseconds(test.duration));

      return testEndTime > currentDate || (testStartTime <= currentDate && testEndTime > currentDate);
    });

    res.status(200).json(upcomingAndOngoingTests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
