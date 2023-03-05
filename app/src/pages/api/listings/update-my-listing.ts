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

        if (!user?.listing_id || !user.listing_id || user.listing_id === null) throw new Error('You\'re not managing any upcycling listing to perform this action...')

        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error parsing form data' });
            }
            if (fields.listing_name && fields.listing_name.length > 50) {
                return res.status(400).json({ error: 'listing_name should be between 1 to 50 chars' });
            }

            if (fields.address && fields.address.length > 50) {
                return res.status(400).json({ error: 'address should be between 5 to 80 chars' });
            }

            const categories = (fields.categories as string).split('%%~~%%')

            if (categories.length === 0) {
                return res.status(400).json({ error: 'you should choose atleast one category/tags' });
            }

            // Do something with the form data
            let assetUrl = ''
            if (files.image) {
                const filePath = (files.image as any).filepath
                assetUrl = await uploadFileFromPath(filePath, 'upcyclerx.appspot.com')
                console.log(assetUrl, filePath)
            }

            const prisma = (new PrismaClient())

            const data: any = {
                address: fields.address as string,
                listing_name: fields.listing_name as string,
                categories: categories,

            }
            if (assetUrl) {
                data['picture_url'] = assetUrl
            }
            const response = await prisma.listing.update({
                data,
                where: {
                    id: user.listing_id as string
                }
            })

            res.send({
                updated_doc: response
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
