

// This is only for providers


import { getAuthUser } from '@/utils/getAuthUser'
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'


export type Listings_MyListing_ApiResponse = {
    categories: string[];
    address: string;
    listing_name: string;
    picture_url: string;
    adminId: string;
    rating: number,
    projects: {
        id: string;
        asset_url: string;
        short_desc: string;
    }[];
} | null

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

        const user=getAuthUser(req)
        if(!user?.listing_id) throw new Error('This route is only for upcyclers..')

        const result=await primsa.listing.findUnique({
            select: {
                categories: true,
                address: true,
                listing_name: true,
                picture_url: true,
                adminId: true,
                rating: true,
                projects: {
                    select: {
                        asset_url: true,
                        id: true,
                        short_desc: true
                    }
                }
            },
            where: {
                adminId: user.id
            }
        })
        res.send({
            listing: result
        })
    } catch (err: any) {
        res.status(400).send({
            message: err.message
        })
    }
}
