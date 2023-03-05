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
        const user = getAuthUser(req)

        if (req.method !== 'POST') throw new Error('Invalid method')

        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error parsing form data' });
            }

            // Do something with the form data
            const filePath = (files.image as any).filepath

            const assetUrl = await uploadFileFromPath(filePath, 'upcyclerx.appspot.com')
            res.send({
                image_url: assetUrl
            })
        })
    } catch (err: any) {
        res.status(400).send({
            message: err.message
        })
    }
}


export const config = {
    api: {
        bodyParser: false,
    },
};
