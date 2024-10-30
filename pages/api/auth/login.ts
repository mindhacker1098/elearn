import type { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../../util/connect-mongo';

import User from '../../../models/User';



export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    
    await connectMongo()
    const { army_no,password} = req.body;
    

   
    const existingUser = await User.findOne({army_no ,password});
    if (existingUser) {
      return res.status(200).json({army_no,"user":existingUser.user});
    }
    else{
        res.status(400).send('user not exist');
    }





}
