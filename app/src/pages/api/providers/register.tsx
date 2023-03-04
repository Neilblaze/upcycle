// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { potential_provider, PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    newly_inserted_record: potential_provider
} | {
    message: string
}


const prisma = new PrismaClient()


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    try {
        if (req.method === 'POST') {
            const to_insert: potential_provider = req.body;
            await prisma.potential_provider.create({
                data: to_insert,
            })
            res.send({
                newly_inserted_record:  to_insert
            })
        } else {
            throw new Error("invalid method")
        }
    } catch (err: any) {
        res.status(400).send({
            message: err.message
        })
    }

}
