import type { NextApiRequest, NextApiResponse } from 'next'
import { getAuthUser } from '@/utils/getAuthUser';
import { PrismaClient } from '@prisma/client';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const user = getAuthUser(req)
        const id=req.query.id as string;

        const chunks=id.split('-')
        const storeId=chunks[1];
        const regularUserId=chunks[0];

        console.log(regularUserId, storeId)

        if(user.id===regularUserId || (user.id!==regularUserId && storeId===user.listing_id)){
            // cool
            const prisma = new PrismaClient()
            const response=await prisma.chat_metadata.upsert({
                create: {
                    listingId: storeId,
                    userId: regularUserId
                },
                update: {},
                where: {
                    listingId_userId: {
                        listingId: storeId,
                        userId: regularUserId
                    }
                }
            })

            res.send({
                newly_inserted_doc: response
            })

        }else{
            throw new Error(`invalid access;`)
        }


    } catch (err: any) {
        res.status(400).json({error: err?.message})
    }
}
