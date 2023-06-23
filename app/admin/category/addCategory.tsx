'use client'
import React, { SyntheticEvent } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

const AddCategory = () => {
    const [name, setName] = React.useState('')

    const [isMutating, setIsMutating] = React.useState(false)
    const [isOpen, setIsOpen] = React.useState(false)

    const router = useRouter()

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        setIsMutating(true)
        await axios.post('/api/categories', {
            name: name
        })

        setIsMutating(false)
        setName('')

        router.refresh()
        setIsOpen(false)
    }
    const handleModal = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div>
            <button className="btn" onClick={handleModal}>Tambah Baru</button>
            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Tambah Kategori</h3>
                    <form onSubmit={handleSubmit}>
                        <div className='form-control w-full'>
                            <label className="label font-bold">Nama Kategori</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input input-bordered" placeholder='Nama' required />
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleModal}>Batal</button>
                            {!isMutating
                                ? <button type="submit" className="btn btn-primary">Simpan</button>
                                : <button type="button" className="btn btn-primary" disabled>Menyimpan...</button>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddCategory
