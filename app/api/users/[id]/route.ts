import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";
import * as bcrypt from "bcrypt"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const prisma = new PrismaClient()

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.delete({
        where: {
            id: params.id
        }
    })
    return NextResponse.json(user, { status: 200 })
}

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

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