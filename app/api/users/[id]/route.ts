import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    const user = await prisma.user.delete({
        where: {
            id: params.id
        }
    })
    return NextResponse.json(user, { status: 200 })
}

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
    const body: User = await req.json()
    let password: string = ''
    if (body.password) {
        password = await bcrypt.hash(body.password, 10)
    }

    const user = await prisma.user.update({
        where: {
            id: params.id
        },
        data: {
            name: body.name,
            email: body.email,
            ...(password && { password }),
            role: body.role,
            author: body.author
        }
    })
    return NextResponse.json(user, { status: 200 })
}