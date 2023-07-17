import AttachmentView from '@/components/document/AttachmentView'
import FileView from '@/components/document/FileView'
import { PrismaClient } from '@prisma/client'
import axios from 'axios'

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

const handleFile = async () => {
    // const res = await axios.get(`/api/documents/clk1ynsw80004vsmkf4c6mahj`, { responseType: 'blob' })
    // return URL.createObjectURL(res.data)
}

const FullDocument = async ({ params }: { params: { slug: string } }) => {
    const document = await getDocument({ slug: params.slug })
    // const fileURL = await handleFile()
    // console.log(fileURL)
    return (
        <div className='justify-items-center text-center'>
            <div className="bg-slate-400 h-full">
                <h1 className='text-6xl font-medium'>{document?.title}</h1>
            </div>
            <div className="bg-slate-300 flex flex-col-2 mt-4 gap-4">
                <div className="bg-slate-400 w-full max-w-4xl">
                    <h1>File Dokumen</h1>
                    <FileView documentId='clk6dig5m0001vsi0vg2pzo4a' />
                </div>
                <div className="bg-slate-400 w-full max-w-xs">
                    <h2>Kaetgori</h2>
                    <h2>Subjek</h2>
                    <h2>Tanggal Terbit</h2>
                    <h2>Tempat Terbit</h2>
                    <h2>Penanda Tangan</h2>
                    <h2>Status</h2>
                </div>
            </div>
        </div>
    )
}

export default FullDocument