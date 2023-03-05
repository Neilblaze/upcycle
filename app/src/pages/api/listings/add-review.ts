import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import multer from "multer";
import formidable from 'formidable';
import { uploadFileFromPath } from '@/utils/uploadFile';
import { getAuthUser } from '@/utils/getAuthUser';

// route to send the list of all the providers/upcyclers in the app
// currently we're not having any pagination


type Data = {

} | {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        if (req.method !== 'POST') throw new Error('Invalid method')

        const user = getAuthUser(req)
        if (user.listing_id) throw new Error('upcyclers cannot review any store!')

        const prisma = (new PrismaClient())
        const rating = req.body.rating;
        const review_txt = req.body.review_txt
        const store_id = req.body.store_id

        if (!rating) throw new Error('rating required')
        if (rating <= 0 || rating > 5 || Math.ceil(rating) !== rating) throw new Error('rating should be int, and between 1-5!')


        await prisma.listing.update({
            data: {
                total_rating: {
                    increment: rating
                },
                review_count: {
                    increment: 1
                }
            },
            where: {
                id: store_id
            }
        })

        const response = await prisma.listing_review.create({
            data: {
                rating,
                review_txt,
                listingId: store_id,
                userId: user.id
            },
        })

        res.send({
            created_review: response
        })

        prisma.$disconnect()
    } catch (err: any) {
        res.status(400).send({
            message: err.message
        })
    }
}

