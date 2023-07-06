import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Document } from "@prisma/client";
import fs from 'fs'

const prisma = new PrismaClient();

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

    const dletedDocument = await prisma.document.delete({
        where: {
            id: params.id
        }
    })

    return NextResponse.json(dletedDocument, { status: 200 })
}

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
    const body: Document = await req.json()

}