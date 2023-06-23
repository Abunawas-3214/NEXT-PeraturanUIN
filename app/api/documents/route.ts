import { Prisma, PrismaClient } from '@prisma/client'
import type { Document } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export const POST = async (req: Request) => {
    const body: Document = await req.json()
    const document = await prisma.document.create({
        data: body
    })
    return NextResponse.json(document, { status: 201 })
}