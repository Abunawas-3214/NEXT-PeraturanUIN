import FileView from '@/components/document/FileView'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const prisma = new PrismaClient

const getDocument = async ({ slug }: { slug: string }) => {
    const document = await prisma.document.findFirst({
        where: {
            slug: slug
        },
        include: {
            category: true
        },
    })
    console.log('fetching data')
    return document
}
const FullDocument = async ({ params }: { params: { slug: string } }) => {
    const session = await getServerSession(authOptions)
    const document = await getDocument({ slug: params.slug })
    const role = session?.user.role
    if (document?.visibility === 'PRIVATE' && (!session)) {
        throw new Error('Ini private document, harus masuk')
    }
    if (document?.visibility === 'PROTECTED' && (!session || (role !== 'STAFF' && role !== 'ADMIN' && role !== 'VIP'))) {
        throw new Error('Ini protected document, harus masuk')
    }
    if (document?.visibility === 'HIDEN' && (!session || (role !== 'ADMIN' && role !== 'VIP'))) {
        throw new Error('Ini hiden document, harus masuk')
    }



    return (
        <div className='justify-items-center text-center'>
            <div className="bg-slate-400 h-full">
                <h1 className='text-6xl font-medium'>{document?.title}</h1>
                <h2 className='text-2xl font-medium'>{`${document?.place} - ${String(document?.date.toLocaleDateString())}`}</h2>
            </div>
            <div className="bg-slate-300 flex h-screen flex-col-2 mt-4 gap-4">
                <div className="bg-slate-400 grow">
                    <FileView documentId={params.slug} />
                </div>
                <div className="bg-slate-400 w-full max-w-xs">
                    <div className="card w-full bg-base-100 shadow-xl">
                        <div className="card-body text-left">
                            <h2 className="card-title">Kategori</h2>
                            <p>{document?.category?.name}</p>
                            <div className="divider"></div>
                            <h2 className="card-title">Subject</h2>
                            <p>{document?.subject}</p>
                            <div className="divider"></div>
                            <h2 className="card-title">Pemrakarsa</h2>
                            <p>{document?.initiator}</p>
                            <div className="divider"></div>
                            <h2 className="card-title">Penanda Tangan</h2>
                            <p>{document?.signedBy}</p>
                            <div className="divider"></div>
                            <h2 className="card-title">Status Dokumen</h2>
                            <p>{document?.status ? 'Aktif' : 'Tidak Aktif'}</p>
                            <div className="divider"></div>
                            <h2 className="card-title">Visibilitas</h2>
                            <p>{document?.visibility}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FullDocument