import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Category } from "@prisma/client";

const prisma = new PrismaClient();

export const DELETE = async (req: Request, { params }: { params: { id: String } }) => {
    const category = await prisma.category.delete({
        where: {
            id: Number(params.id)
        }
    })
    return NextResponse.json(category, { status: 200 })
}

export const PATCH = async (req: Request, { params }: { params: { id: String } }) => {
    const body: Category = await req.json()
    const category = await prisma.category.update({
        where: {
            id: Number(params.id)
        },
        data: {
            name: body.name,
        }
    })
    return NextResponse.json(category, { status: 200 })
}