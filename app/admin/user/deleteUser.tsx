'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

type User = {
    id: string,
    name: string,
}

const DeleteUser = ({ user }: { user: User }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isMutating, setIsMutating] = useState(false)
    const router = useRouter()

    const handleDelete = async (userId: string) => {
        setIsMutating(true)
        await axios.delete(`/api/users/${userId}`)

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
                    <h3 className="font-bold text-lg">Apakah anda yakin akan menghapus {user.name} ?</h3>

                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleModal}>Batal</button>
                        {!isMutating ? (
                            <button type="button" className="btn btn-primary" onClick={() => handleDelete(user.id)}>Hapus</button>
                        ) : (
                            <button type="button" className="btn btn-primary" disabled>Menghapus...</button>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteUser