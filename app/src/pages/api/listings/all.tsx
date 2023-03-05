import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

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
        const primsa = new PrismaClient()
        const results=await primsa.listing.findMany({
            select: {
                categories: true,
                address: true,
                review_count: true,
                total_rating: true,
                id: true,
                listing_name: true,
                picture_url: true,
                adminId: true,
                projects: {
                    select: {
                        asset_url: true,
                        id: true,
                        short_desc: true
                    }
                }
            }
        })
        res.send({
            listings: results
        })
    } catch (err: any) {
        res.status(400).send({
            message: err.message
        })
    }
}
