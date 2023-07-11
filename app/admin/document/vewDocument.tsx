'use client'
import type { Document } from "@prisma/client"
import axios from 'axios'
import fileDownload from "js-file-download"

const ViewDocument = ({ document }: { document: Document }) => {

    const handleView = async () => {
        await axios.get(`/api/documents/${document.id}`, { responseType: 'blob' }).then((res) => {
            console.log(res.data.size)
            // const fileBlob = new Blob([res.data], { type: 'application/pdf' })
            fileDownload(res.data, `${document.title}.pdf`)
        })
    }

    return (
        <>
            <button className='btn btn-accent btn-sm' onClick={handleView}>View</button>
        </>
    )
}

export default ViewDocument