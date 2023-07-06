'use client'
import axios from 'axios'
import { ChangeEvent, SyntheticEvent, useState } from 'react'

const AddTest = () => {
    const [attachment, setAttachment] = useState<File | null>(null)

    const [isOpen, setIsOpen] = useState(false)

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("file", attachment ? attachment : '')
        await axios.post('/api/test', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        setIsOpen(false)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setAttachment(file)
        }
    }

    const handleModal = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <button className='btn' onClick={handleModal}>tambah test</button>
            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className='modal-box'>
                    <h3 className='font-bold text-lg'>Tambah Test</h3>
                    <form onSubmit={handleSubmit}>
                        <div className='form-control w-full'>
                            <input type="file" className="file-input file-input-bordered file-input-ghost w-full" onChange={handleFileChange} />
                        </div>
                        <div className='modal-action'>
                            <button type="button" className="btn" onClick={handleModal}>Tutup</button>
                            <button type="submit" className="btn btn-primary">Simpan</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddTest