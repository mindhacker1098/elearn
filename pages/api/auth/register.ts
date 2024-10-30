import type { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../../util/connect-mongo';
import User from '../../../models/User';

export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    await connectMongo()
    const { army_no, user,name,password,courseid} = req.body;
    

   
    const existingUser = await User.findOne({army_no });
    if (existingUser) {
      return res.status(400).send('Username already exists');
    }
    const users = new User({army_no,user,name,password,courseid})
const ans=await users.save()
console.log(ans);

res.status(200).json({army_no});



}
