import { PrismaClient } from '@prisma/client'
import type { User } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export const POST = async (req: Request) => {
    const body: User = await req.json()
    const user = await prisma.user.create({
        data: body
    })
    return NextResponse.json(user, { status: 201 })
}
