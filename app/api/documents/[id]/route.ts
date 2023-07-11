import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Document } from "@prisma/client";
import fs from 'fs'
import path from "path"

const prisma = new PrismaClient()

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    const document = await prisma.document.findFirst({
        where: {
            id: params.id
        },
        select: {
            category: true,
            attachment: true
        }
    })

    const filePath = `attachments/${document?.category.name}/${document?.attachment}.pdf`
    const fileBuffer = fs.readFileSync(filePath)
    const fileContent = new Blob([fileBuffer], { type: 'application/pdf' })
    console.log(fileContent)
    // console.log(fileContent.size)
    // return NextResponse.json(fileContent, { status: 200 })
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

    fs.unlinkSync(`attachments/${document?.category.name}/${document?.attachment}.pdf`)

    const deletedDocument = await prisma.document.delete({
        where: {
            id: params.id
        }
    })

    return NextResponse.json(deletedDocument, { status: 200 })
}

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
    const body: Document = await req.json()

}