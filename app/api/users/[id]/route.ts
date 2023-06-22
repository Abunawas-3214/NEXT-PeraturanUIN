import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";

const prisma = new PrismaClient()

export const DELETE = async (req: Request, { params }: { params: { id: String } }) => {
    const user = await prisma.user.delete({
        where: {
            id: Number(params.id)
        }
    })
    return NextResponse.json(user, { status: 200 })
}

export const PATCH = async (req: Request, { params }: { params: { id: String } }) => {
    const body: User = await req.json()
    const user = await prisma.user.update({
        where: {
            id: Number(params.id)
        },
        data: {
            name: body.name,
            email: body.email,
            password: body.password,
            role: body.role,
            author: body.author
        }
    })
    return NextResponse.json(user, { status: 200 })
}