import type { NextApiRequest, NextApiResponse } from "next";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const dateTime = req.query.id1 as string; // start time in "YYYY-MM-DD_HH:mm" format
  const duration = req.query.id as string; // duration in "1h 3m" format

  if (!dateTime || !duration) {
    res.status(400).json({ error: "Invalid date_time or duration format" });
    return;
  }

  // Parse the date and time part
  const [datePart, timePart] = dateTime.split('_');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hours, minutes] = timePart.split(':').map(Number);

  const startDate = new Date(year, month - 1, day, hours, minutes);

  // Parse the duration
  const durationRegex = /(\d+h)?\s*(\d+m)?/;
  const matches = duration.match(durationRegex);
  if (!matches) {
    res.status(400).json({ error: "Invalid duration format" });
    return;
  }

  const hoursMatch = matches[1];
  const minutesMatch = matches[2];

  const durationHours = hoursMatch ? parseInt(hoursMatch.replace("h", "")) : 0;
  const durationMinutes = minutesMatch ? parseInt(minutesMatch.replace("m", "")) : 0;

  // Calculate the end time
  const endDate = new Date(startDate);
  endDate.setHours(endDate.getHours() + durationHours);
  endDate.setMinutes(endDate.getMinutes() + durationMinutes);

  // Calculate the current time
  const currentTime = new Date();

  // Check if the test has not started yet
  if (currentTime < startDate) {
    res.status(200).json({ data: 0 });
    return;
  }

  // Calculate the time left in seconds from the current time until the end time
  const timeLeftInSeconds = Math.floor((endDate.getTime() - currentTime.getTime()) / 1000);

  // If the end time is in the past, return 0
  const timeLeft = timeLeftInSeconds > 0 ? timeLeftInSeconds : 0;

  res.status(200).json({ data: timeLeft });
}
