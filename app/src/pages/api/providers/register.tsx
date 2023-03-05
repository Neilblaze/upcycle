// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAuthToken } from '@/utils/getAuthToken'
import { getAuthUser } from '@/utils/getAuthUser'
import { potential_provider, PrismaClient } from '@prisma/client'
import { ObjectId } from 'bson'
import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'


type Data = {
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

            const primsa = new PrismaClient()

            const id = new ObjectId();
            const listingId = id.toString()

            const user = await primsa.user.create({
                data: {
                    email: to_insert.email,
                    name: `${to_insert.name}'s ADMIN`,
                    listing_id: listingId,
                    picture: 'https://unsplash.com/photos/E8Ufcyxz514/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjc4MDIzNDM4&force=true&w=640',
                }
            })



            const storeFront = await (prisma).listing.create({
                data: {
                    address: to_insert.address,
                    listing_name: to_insert.name,
                    picture_url: 'https://unsplash.com/photos/OYYE4g-I5ZQ/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mnx8ZmFzaGlvbiUyMHN0b3JlfGVufDB8fHx8MTY3Nzk1NDg3Mg&force=true&w=640',
                    categories: [],
                    adminId: user.id
                }
            })

            const token = getAuthToken(user);

            res.setHeader('set-cookie', [
                cookie.serialize(
                    process.env.AUTH_COOKIE_KEY ?? "dummy_key", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    maxAge: 604800,
                    sameSite: 'strict',
                    path: `/`
                }
                ),
            ])


            res.send({
                newly_inserted_record: storeFront
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
