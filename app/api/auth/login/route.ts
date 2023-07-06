import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { NextResponse } from 'next/server'

interface RequestBody {
    name: string;
    password: string;
}

const prisma = new PrismaClient()

export async function POST(req: Request) {
    const body: RequestBody = await req.json()
    const user = await prisma.user.findFirst({
        where: {
            name: body.name
        }
    })
    if (user?.password != null) {
        if (user && (await bcrypt.compare(body.password, user.password))) {
            const { password, ...userWithoutPassword } = user
            return NextResponse.json(userWithoutPassword)
        } else {
            return NextResponse.json({ error: 'Ivalid' }, { status: 500 })
        }
    } else {
        return NextResponse.json({ error: 'IPassword not Found' }, { status: 500 })
    }

}
