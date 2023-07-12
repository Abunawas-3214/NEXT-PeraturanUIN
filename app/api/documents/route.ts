import { PrismaClient, Visibility } from '@prisma/client'
import { NextResponse } from 'next/server'
import fs from 'fs'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()

export const POST = async (req: Request) => {
    const formData = await req.formData()
    const visibility = formData.get('visibility') as Visibility
    const attachmentName: string = randomUUID()
    const file = formData.get('attachment') as Blob
    const mimeType = file.type;
    const fileExtension = mimeType.split("/")[1]
    const buffer = Buffer.from(await file.arrayBuffer())

    const document = await prisma.document.create({
        data: {
            title: String(formData.get('title')),
            categoryId: Number(formData.get('categoryId')),
            subject: String(formData.get('subject')),
            date: String(formData.get('date')),
            initiator: String(formData.get('initiator')),
            place: String(formData.get('place')),
            signedBy: String(formData.get('signedBy')),
            visibility: visibility,
            status: Boolean(formData.get('status')),
            authorId: String(formData.get('authorId')),
            attachment: attachmentName
        }
    })
    if (document) {
        fs.writeFileSync(`attachments/${attachmentName}.${fileExtension}`, buffer)
    }
    return NextResponse.json(document, { status: 201 });
}