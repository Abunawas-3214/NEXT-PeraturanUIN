import TopbarAdmin from '@/components/TopbarAdmin'
import { PrismaClient } from '@prisma/client'
import type { Prisma, Role } from '@prisma/client'
import React from 'react'
import AddDocument from './addDocument'
import DeleteDocument from './deleteDocument'
import UpdateDocument from './updateDocument'
import ViewDocument from './vewDocument'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const getDocuments = async ({ userId, userRole }: { userId: string, userRole: Role }) => {
    const isAdmin = userRole === "ADMIN"
    let docmentAuthorId: Prisma.DocumentWhereInput = {}
    if (!isAdmin) {
        docmentAuthorId = {
            authorId: userId
        }
    }

    const res = await prisma.document.findMany({
        where: docmentAuthorId,
        include: {
            category: true
        },
    })
    return res
}

const getCategories = async () => {
    const res = await prisma.category.findMany()
    return res
}

const prisma = new PrismaClient

const Document = async () => {
    const session = await getServerSession(authOptions)
    const [documents, categories] = await Promise.all([getDocuments({ userId: session?.user.id as string, userRole: session?.user.role as Role }), getCategories()])
    return (
        <div>
            <TopbarAdmin menuTitle={'Data Dokumen'} />
            <div className='my-2'>
                <AddDocument categories={categories} authorId={session?.user.id as string} />
            </div>
            <table className='table w-full'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Dokumen</th>
                        <th>Kategori</th>
                        <th>Visibilitas</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {documents.map((document, index) => (
                        <tr key={document.id}>
                            <td>{index + 1}</td>
                            <td>{document.title}</td>
                            <td>{document.category.name}</td>
                            <td>{document.visibility}</td>
                            <td>
                                {(document.status === true)
                                    ? <p>Aktif</p>
                                    : <p>Tidak Aktif</p>
                                }
                            </td>
                            <td className='flex justify-center space-x-1'>
                                <ViewDocument document={document} />
                                <UpdateDocument document={document} categories={categories} />
                                <DeleteDocument document={document} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Document