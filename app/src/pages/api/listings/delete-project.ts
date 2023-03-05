import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import multer from "multer";
import formidable from 'formidable';
import { uploadFileFromPath } from '@/utils/uploadFile';
import { getAuthUser } from '@/utils/getAuthUser';

// route to send the list of all the providers/upcyclers in the app
// currently we're not having any pagination



const storage = multer.memoryStorage()

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 10 } // 5 MB
});

type Data = {

} | {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        const user = getAuthUser(req)

        if (req.method !== 'POST') throw new Error('Invalid method')

        if (!user?.listing_id || !user.listing_id || user.listing_id === null) throw new Error('You\'re not managing any upcycling listing to perform this action...')

        const {projectId} = req.body

        const prisma=new PrismaClient()

        const db_response=await prisma.listings_projects.delete({
            where: {
                id: projectId
            }
        })

        res.send({
            db_response
        })



    } catch (err: any) {
        res.status(400).send({
            message: err.message
        })
    }
}

