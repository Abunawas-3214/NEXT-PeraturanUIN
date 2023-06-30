import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Document } from "@prisma/client";

const prisma = new PrismaClient();

export const DELETE = async (req: Request, { params }: { params: { id: String } }) => {
    const category = await prisma.document.delete({
        where: {
            id: Number(params.id)
        }
    })
    return NextResponse.json(category, { status: 200 })
}

export const PATCH = async (req: Request, { params }: { params: { id: String } }) => {
    const body: Document = await req.json()

    const category = await prisma.document.update({
        where: {
            id: Number(params.id)
        },
        data: {
            title: body.title,
            categoryId: Number(body.categoryId),
            subject: body.subject,
            date: body.date,
            initiator: body.initiator,
            place: body.place,
            signedBy: body.signedBy,
            visibility: body.visibility,
            status: body.status,
            attachment: body.attachment
        }
    })
}