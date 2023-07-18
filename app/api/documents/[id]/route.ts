import { NextResponse } from "next/server";
import { PrismaClient, Visibility } from "@prisma/client";
import slugify from 'slugify'
import fs from 'fs'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    const document = await prisma.document.findFirst({
        where: {
            OR: [
                {
                    id: params.id
                },
                {
                    slug: params.id
                }
            ]
        },
        select: {
            attachment: true
        }
    })

    const filePath = `attachments/${document?.attachment}.pdf`
    const fileBuffer = fs.readFileSync(filePath)
    const fileContent = new Blob([fileBuffer], { type: 'application/pdf' })
    console.log(fileContent)
    return new Response(fileContent, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=${document?.attachment}.pdf`,
        },
        status: 200
    })
}

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {

    const document = await prisma.document.findFirst({
        where: {
            id: params.id
        },
        select: {
            category: true,
            attachment: true
        }
    })

    fs.unlinkSync(`attachments/${document?.attachment}.pdf`)

    const deletedDocument = await prisma.document.delete({
        where: {
            id: params.id
        }
    })

    return NextResponse.json(deletedDocument, { status: 200 })
}

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
    const formData = await req.formData()
    const visibility = formData.get('visibility') as Visibility

    let attachmentNameNew: string = ''
    if (formData.get('attachment')) {
        const attachmentOld = await prisma.document.findFirst({
            where: {
                id: params.id
            },
            select: {
                attachment: true
            }
        })
        attachmentNameNew = randomUUID()
        const file = formData.get('attachment') as Blob
        const mimeType = file.type;
        const fileExtension = mimeType.split("/")[1]
        const buffer = Buffer.from(await file.arrayBuffer())

        fs.unlinkSync(`attachments/${attachmentOld?.attachment}.pdf`)
        fs.writeFileSync(`attachments/${attachmentNameNew}.${fileExtension}`, buffer)
    }
    const document = await prisma.document.update({
        where: {
            id: params.id
        },
        data: {
            title: String(formData.get('title')),
            slug: slugify(String(formData.get('title')), { lower: true }),
            categoryId: Number(formData.get('categoryId')),
            subject: String(formData.get('subject')),
            date: String(formData.get('date')),
            initiator: String(formData.get('initiator')),
            place: String(formData.get('place')),
            signedBy: String(formData.get('signedBy')),
            visibility: visibility,
            status: Boolean(formData.get('status')),
            ...(formData.get('attachment') ? { attachment: attachmentNameNew } : {})
        }
    })
    return NextResponse.json(document, { status: 201 });
}