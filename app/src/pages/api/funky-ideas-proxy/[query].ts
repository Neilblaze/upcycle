// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getErrorStringFromAxiosErr } from '@/pages/p/add-project'
import { PrismaClient } from '@prisma/client'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  try {
    const query = req.query.query as string

    const params = new URLSearchParams()
    params.append('q', query)
    axios.get(`https://playgroundai.com/_next/data/t1BArL8cSVmdlKXgae4sW/search.json?${params.toString()}`)
      .then(e => {
        res.send({
          data: e.data.pageProps.data
        })
      })

  } catch (err: any) {
    res.status(400).send({
      message: err.message
    })
  }
}


