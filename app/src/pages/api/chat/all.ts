import type { NextApiRequest, NextApiResponse } from 'next'
import { getAuthUser } from '@/utils/getAuthUser';
import { PrismaClient } from '@prisma/client';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const user = getAuthUser(req)
            // cool
            const prisma = new PrismaClient()

            const response=await prisma.chat_metadata.findMany({
                where: {
                    OR: [
                        (user.listing_id? {
                            listingId: user.listing_id as string
                        }: {}),
                        {
                            userId: user.id as string
                        },
                    ]
                },
                select: {
                    listingId: true,
                    userId: true,
                    started_at: true,
                    listing: {
                        select: {
                            listing_name: true,
                            picture_url: true
                        }
                    }
                }
            })

            res.send({
                chats: response
            })


    } catch (err: any) {
        res.status(400).json({error: err?.message})
    }
}
