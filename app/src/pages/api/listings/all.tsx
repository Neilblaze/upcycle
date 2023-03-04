import type { NextApiRequest, NextApiResponse } from 'next'

// route to send the list of all the providers in the app
// currently we're not having any pagination


type Data = {

} | {
    message: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {

    } catch (err: any) {
        res.status(400).send({
            message: err.message
        })
    }
}
