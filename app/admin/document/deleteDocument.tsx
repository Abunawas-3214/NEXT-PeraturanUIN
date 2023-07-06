'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Document } from "@prisma/client"

const DeleteDocument = ({ document }: { document: Document }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isMutating, setIsMutating] = useState(false)
    const router = useRouter()

    const handleDelete = async (documentId: string) => {
        setIsMutating(true)
        await axios.delete(`/api/documents/${documentId}`)
        setIsMutating(false)
        router.refresh()
        setIsOpen(false)
    }
    const handleModal = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div>
            <button className="btn btn-error btn-sm" onClick={handleModal}>Delete</button>
            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Apakah anda yakin akan menghapus Dokumen <br /> "{document.title}" ?</h3>

                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleModal}>Batal</button>
                        {!isMutating ? (
                            <button type="button" className="btn btn-primary" onClick={() => handleDelete(document.id)}>Hapus</button>
                        ) : (
                            <button type="button" className="btn btn-primary" disabled>Menghapus...</button>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteDocument