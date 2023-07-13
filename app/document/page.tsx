import DocumentCard from '@/components/document/DocumentCard'
import FilterControll from '@/components/document/FilterControll'
import React from 'react'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient

const getDocuments = async () => {
    return await prisma.document.findMany({
        include: {
            category: true
        },
    })
}

const Document = async () => {
    const documents = await getDocuments()

    return (
        <>
            <div className='input-group pb-4'>
                <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                <button className="btn btn-primary">Cari Dokumnen</button>
            </div>
            <div className='flex gap-8'>
                <FilterControll />
                <div className='grow h-screen'>
                    <div className='grid grid-cols-2 gap-x-8 gap-y-6'>
                        {documents.map((document) => (
                            <DocumentCard document={document} />
                        ))}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Document