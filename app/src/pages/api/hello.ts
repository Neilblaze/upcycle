// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const val = await (new PrismaClient()).listing.create({
    data: {
      city: 'Pasadena',
      listing_name: 'Funky Fashion',
      picture_url: 'https://unsplash.com/photos/OYYE4g-I5ZQ/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mnx8ZmFzaGlvbiUyMHN0b3JlfGVufDB8fHx8MTY3Nzk1NDg3Mg&force=true&w=640',
      categories: ['Men\'s Wear'],
      adminId: '64034e24f721fc937c8fc56a'
    }
  })

  res.status(200).json({ name: 'John Doe', val })
}


