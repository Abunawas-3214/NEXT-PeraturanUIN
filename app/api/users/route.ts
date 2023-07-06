import { PrismaClient } from '@prisma/client'
import type { Role } from '@prisma/client'
import { NextResponse } from 'next/server'
import * as bcrypt from "bcrypt"

interface RequestBody {
    name: string
    email: string
    password: string
    role: Role
    author: boolean
}


const prisma = new PrismaClient()

export const POST = async (req: Request) => {
    const body: RequestBody = await req.json()
    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: await bcrypt.hash(body.password, 10),
            role: body.role,
            author: body.author
        }
    })
    const { password, ...userWithoutPassword } = user
    return NextResponse.json(userWithoutPassword, { status: 201 })
}
