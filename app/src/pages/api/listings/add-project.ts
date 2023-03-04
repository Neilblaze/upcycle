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

        // upload.single('image')(req as any, res  as any, (err) => {
        //     if (err instanceof multer.MulterError) {
        //       console.error(err);
        //       return res.status(500).json({ error: 'Error uploading file' });
        //     } else if (err) {
        //       console.error(err);
        //       return res.status(500).json({ error: 'Unknown error occurred' });
        //     }

        //     // Do something with the form data
        //     console.log(req.body);

        //     return res.status(200).json({ message: 'File saved successfully' });
        //   });

        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error parsing form data' });
            }

            // Do something with the form data
            const filePath = (files.image as any).filepath

            const assetUrl = await uploadFileFromPath(filePath, 'upcyclerx.appspot.com')
            console.log(assetUrl, filePath)

            const prisma = (new PrismaClient())

            const response = await prisma.listings_projects.create({
                data: {
                    asset_url: assetUrl,
                    short_desc: fields.short_desc as string,
                    listingId: user.listing_id as string
                }
            })

            res.send({
                newly_inserted_doc: response
            })

            prisma.$disconnect()
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
