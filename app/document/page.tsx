import DocumentCard from '@/components/document/DocumentCard'
import FilterControll from '@/components/document/FilterControll'
import React from 'react'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import type { Prisma } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient

const getDocuments = async ({ hidenDocument = false }: { hidenDocument: boolean }) => {
    let hidenDocumentCondition: Prisma.DocumentWhereInput = {}
    if (!hidenDocument) {
        hidenDocumentCondition = {
            NOT: {
                visibility: 'HIDEN'
            }
        }
    }
    return await prisma.document.findMany({
        where: hidenDocumentCondition,
        include: {
            category: true
        },
    })
}

const Document = async () => {
    const session = await getServerSession(authOptions)
    let hidenDocument: boolean
    (session?.user.role === ('ADMIN' || 'VIP')) ? hidenDocument = true : hidenDocument = false
    const documents = await getDocuments({ hidenDocument: hidenDocument })

    return (
        <>
            <div className='input-group pb-4'>
                <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                <button className="btn btn-primary">Cari Dokumnen</button>
            </div>
            <div className='flex gap-8'>
                <div className='flex-none w-72'>
                    <FilterControll />
                </div>
                <div className='grow h-screen'>
                    <div className='grid grid-cols-2 gap-x-8 gap-y-6'>
                        {documents.map((document) => (
                            <DocumentCard document={document} key={document.id} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Document