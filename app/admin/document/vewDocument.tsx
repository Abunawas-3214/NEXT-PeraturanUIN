'use client'
import AttachmentView from "@/components/document/AttachmentView"
import type { Document } from "@prisma/client"
import axios from 'axios'
import { useState } from "react"

const ViewDocument = ({ document }: { document: Document }) => {
    const [fileURL, setFileURL] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    const handleFile = async () => {
        const res = await axios.get(`/api/documents/${document.id}`, { responseType: 'blob' })
        setFileURL(URL.createObjectURL(res.data))
        console.log('fetching file in handle')
    }

    const handleModal = () => {
        if (!isOpen) {
            handleFile()
        }
        setIsOpen(!isOpen)
    }

    return (
        <>
            <button className='btn btn-accent btn-sm' onClick={handleModal}>View</button>
            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box w-11/12 max-w-5xl h-full">
                    <AttachmentView fileURL={fileURL} fileHeader={false} />
                    <div className="modal-action">
                        <button className="btn" onClick={handleModal}>Tutup</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewDocument