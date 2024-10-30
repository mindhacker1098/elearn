import type { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../../util/connect-mongo';

import User from '../../../models/User';



export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    
    await connectMongo()
    const { _id} = req.body;
    

   
    const existingUser = await User.findOne({_id});
    if (existingUser) {
      return res.status(200).json({_id});
    }
    else{
        res.status(400).send('user not exist');
    }


}
