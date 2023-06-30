import { PrismaClient, Visibility } from '@prisma/client'
import type { Document } from '@prisma/client'
import { NextApiResponse, NextApiRequest } from 'next'
import { NextResponse } from 'next/server'
import { IncomingForm } from 'formidable'
import exp from 'constants'

const prisma = new PrismaClient()

export const POST = async (req: Request) => {
    const formData = await req.formData()
    const visibility = formData.get('visibility') as Visibility
    const attachment = formData.get('attachment') as File

    // const entries = Array.from(formData.entries());

    // console.log(entries.forEach((item: any) => console.log(item)))
    // console.log(entries[0][1])

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
            attachment: attachment.name
        }
    })

    return NextResponse.json(document, { status: 201 });
}