
import { NextResponse } from 'next/server'
import fs from 'fs'
import { randomUUID } from 'crypto';

export const config = {
    api: {
        bodyParser: false,
    },
};

export const POST = async (req: Request) => {
    const formData = await req.formData()
    const file = formData.get('file') as Blob | null

    if (!file) {
        return NextResponse.json(
            { error: "File blob is required." },
            { status: 400 }
        );
    }

    const mimeType = file.type;
    const fileExtension = mimeType.split("/")[1]
    const buffer = Buffer.from(await file.arrayBuffer())

    fs.writeFileSync(`attachments/${randomUUID()} .${fileExtension}`, buffer)

    return NextResponse.json(formData, { status: 201 });
}