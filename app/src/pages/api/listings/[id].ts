

// This is only for providers


import { getAuthUser } from '@/utils/getAuthUser'
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'


export type Listings_ById_ApiResponse = {
    categories: string[];
    address: string;
    listing_name: string;
    picture_url: string;
    review_count: number,
    total_rating: number,
    projects: {
        id: string;
        asset_url: string;
        short_desc: string;
    }[];
    listing_review: {
        rating: number;
        id: string;
        review_txt: string;
        submitted_at: Date;
    }[];
} | null

type Data = {
    listing: Listings_ById_ApiResponse
} | {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        const primsa = new PrismaClient()
        const user = getAuthUser(req)

        const result = await primsa.listing.findUnique({
            select: {
                categories: true,
                address: true,
                listing_name: true,
                picture_url: true,
                review_count: true,
                total_rating: true,
                projects: {
                    select: {
                        asset_url: true,
                        id: true,
                        short_desc: true
                    }
                },
                listing_review: {
                    select: {
                        id: true,
                        rating: true,
                        review_txt: true,
                        submitted_at: true,
                    },
                    orderBy: {
                        submitted_at: 'desc'
                    }
                }
            },
            where: {
                id: req.query.id as string
            }
        })

        if(!result) throw new Error('Invalid store id')
        res.send({
            listing: result
        })
    } catch (err: any) {
        res.status(400).send({
            message: err.message
        })
    }
}
