import type { NextApiRequest, NextApiResponse } from 'next'
import { getAuthUser } from '@/utils/getAuthUser';
import { PrismaClient } from '@prisma/client';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const user = getAuthUser(req)
        const prisma = new PrismaClient()
        res.send({
            is_authenticated: true,
            user: (await prisma.user.findUnique({ where: { email: user?.email } }))
        })
    } catch (err) {
        res.send({ is_authenticated: false })
    }
}
