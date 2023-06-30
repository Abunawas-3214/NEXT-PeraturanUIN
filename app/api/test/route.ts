
import { NextResponse } from 'next/server'
import IncomingForm from 'formidable'
import fs from 'fs-extra';
import { json } from 'stream/consumers';
import { NextApiRequest } from 'next';
import formidable from 'formidable';

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

export const POST = async (req: Request) => {

    // const form = formidable()
    // const res = await req.json()
    const formData = (await req.formData()).get('file') as File
    const fileName = formData.name
    console.log(fileName)
    // const entries = Array.from(formData.entries());
    // console.log(entries.forEach((item: any) => console.log(item)))
    return NextResponse.json({ formData });
}