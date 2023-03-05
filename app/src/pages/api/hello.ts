// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  // Just a dummy route for the admins.

  // const val = await (new PrismaClient()).listing.create({
  //   data: {
  //     address: '420 Blazeit Dr, Los Angeles, CA',
  //     listing_name: 'Funky Fashion main',
  //     picture_url: 'https://unsplash.com/photos/OYYE4g-I5ZQ/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mnx8ZmFzaGlvbiUyMHN0b3JlfGVufDB8fHx8MTY3Nzk1NDg3Mg&force=true&w=640',
  //     categories: ['Men\'s Wear'],
  //     adminId: '64043f25c05e4f1540dc3412'
  //   }
  // })

  // res.status(200).json({ name: 'John Doe', val })
}


