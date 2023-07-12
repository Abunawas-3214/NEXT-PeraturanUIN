'use client'
import type { Document } from "@prisma/client"
import axios from 'axios'
import { useState } from "react"

const ViewDocument = ({ document }: { document: Document }) => {
    const [fileURL, setFileURL] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    const handleFile = async () => {
        const res = await axios.get(`/api/documents/${document.id}`, { responseType: 'blob' })
        setFileURL(URL.createObjectURL(res.data))
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
                    {(fileURL !== '')
                        ? <embed src={fileURL + '#toolbar=0&navpanes=0&scrollbar=0'} className="w-full h-full" />
                        : <div className="w-full h-full flex justify-center">
                            <span className="loading loading-spinner loading-lg m-auto"></span>
                        </div>

                    }
                    <div className="modal-action">
                        <button className="btn" onClick={handleModal}>Tutup</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewDocument