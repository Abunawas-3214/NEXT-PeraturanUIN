import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Category } from "@prisma/client";
import fs from 'fs'

const prisma = new PrismaClient();

export const DELETE = async (req: Request, { params }: { params: { id: String } }) => {
    const category = await prisma.category.delete({
        where: {
            id: Number(params.id)
        }
    })
    fs.rmdirSync(`attachments/${category.name}`, { recursive: true })
    return NextResponse.json(category, { status: 200 })
}

export const PATCH = async (req: Request, { params }: { params: { id: String } }) => {
    const body: Category = await req.json()
    const oldCategory = await prisma.category.findFirst({
        where: {
            id: Number(params.id)
        }
    })
    const category = await prisma.category.update({
        where: {
            id: Number(params.id)
        },
        data: {
            name: body.name,
        }
    })
    fs.renameSync(`attachments/${oldCategory?.name}`, `attachments/${category.name}`)
    return NextResponse.json(category, { status: 200 })
}