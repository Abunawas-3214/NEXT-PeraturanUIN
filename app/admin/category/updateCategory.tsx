'use client'
import { useState, SyntheticEvent } from 'react'
import type { Category } from '@prisma/client'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const UpdateCategory = ({ category }: { category: Category }) => {
    const [name, setName] = useState(category.name)
    const [isOpen, setIsOpen] = useState(false)
    const [isMutating, setIsMutating] = useState(false)

    const router = useRouter()

    const handleUpdate = async (e: SyntheticEvent) => {
        e.preventDefault()
        setIsMutating(true)
        await axios.patch(`/api/categories/${category.id}`, {
            name: name
        })
        setIsMutating(false)
        router.refresh()
        setIsOpen(false)
    }

    const handleModal = () => {
        setIsOpen(!isOpen)
        if (isOpen == false) {
            setName(category.name)
        }
    }
    return (
        <div>
            <button className="btn btn-info btn-sm" onClick={handleModal}>Edit</button>
            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit User</h3>
                    <form onSubmit={handleUpdate}>
                        <div className='form-control w-full'>
                            <label className="label font-bold">Nama</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input input-bordered" placeholder='Nama' required />
                        </div>
                        <div className='modal-action'>
                            <button type="button" className="btn" onClick={handleModal}>Tutup</button>
                            {!isMutating ? (
                                <button type="submit" className="btn btn-primary">Ubah</button>
                            ) : (
                                <button type="button" className="btn btn-primary" disabled>Mengubah...</button>
                            )}

                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default UpdateCategory