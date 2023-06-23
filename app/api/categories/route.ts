import { PrismaClient } from '@prisma/client'
import type { Category } from '@prisma/client'
import { NextResponse } from 'next/server'
import fs from 'fs'

const prisma = new PrismaClient()

export const POST = async (req: Request) => {
    const body: Category = await req.json()
    const category = await prisma.category.create({
        data: body
    })
    fs.mkdirSync(`attachments/${body.name}`, { recursive: true })
    return NextResponse.json(category, { status: 201 })
}
