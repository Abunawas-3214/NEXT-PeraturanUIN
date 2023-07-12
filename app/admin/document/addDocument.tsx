'use client'
import { SyntheticEvent, useState } from 'react'
import type { Category } from '@prisma/client'
import { Visibility } from '@prisma/client'
import { useRouter } from 'next/navigation'
import Datepicker from 'react-tailwindcss-datepicker'
import axios from 'axios'

const AddDocument = ({ categories, authorId }: { categories: Category[], authorId: string }) => {
    const visibilities = Object.keys(Visibility)

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [subject, setSubject] = useState('')
    const [date, setDate] = useState({
        startDate: null,
        endDate: null
    })
    const [initiator, setInitiator] = useState('')
    const [place, setPlace] = useState('')
    const [signedBy, setSignedBy] = useState('')
    const [visibility, setVisibility] = useState(visibilities[0])
    const [status, setStatus] = useState(true)
    const [attachment, setAttachment] = useState<File | null>(null)

    const [isMutating, setIsMutating] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const router = useRouter()


    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        setIsMutating(true)

        const formData = new FormData()
        formData.append('title', title)
        formData.append('categoryId', category)
        formData.append('categoryName', categories.find(c => c.id === Number(category))?.name as string)
        formData.append('subject', subject)
        formData.append('date', `${date.startDate}T00:00:00.000Z`)
        formData.append('initiator', initiator)
        formData.append('place', place)
        formData.append('signedBy', signedBy)
        formData.append('visibility', visibility)
        formData.append('status', String(status))
        formData.append('authorId', authorId)
        formData.append('attachment', attachment ? attachment : '')

        await axios.post('/api/documents', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })

        setIsMutating(false)
        router.refresh()
        setIsOpen(false)
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setAttachment(file)
        }
    }
    const handleModal = () => {
        (isOpen == true) ? resetField() : ''
        setIsOpen(!isOpen)
    }

    const handleDate = (date: any) => {
        setDate(date)
    }

    const handleStatus = () => {
        setStatus(!status)
    }

    const resetField = () => {
        setTitle('')
        setCategory('')
        setSubject('')
        setDate({
            startDate: null,
            endDate: null
        })
        setInitiator('')
        setPlace('')
        setSignedBy('')
        setVisibility(visibilities[0])
        setStatus(true)
        setIsMutating(false)
    }


    return (
        <div>
            <button className="btn" onClick={handleModal}>Tambah Baru</button>
            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Tambahkan Dokumen</h3>
                    <form onSubmit={handleSubmit}>
                        <div className='form-control w-full'>
                            <label className="label font-bold">Nama</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input input-bordered" placeholder='Nama' required />
                        </div>
                        <div className="columns-2">
                            <div className='form-control w-full'>
                                <label className="label font-bold">Perihal</label>
                                <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className="input input-bordered" placeholder='Perihal' required />
                            </div>
                            <div className='form-control w-full'>
                                <label className="label font-bold">Ketegori</label>
                                <select value={category} onChange={(e) => setCategory(e.target.value)} className="select select-bordered" required>
                                    <option value="" disabled >Pilih Kategori Dokumen</option>
                                    {categories.map((category) => (
                                        <option value={category.id} key={category.id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className='form-control w-full'>
                            <label className="label font-bold">Pemrakarsa</label>
                            <input type="text" value={initiator} onChange={(e) => setInitiator(e.target.value)} className="input input-bordered" placeholder='Pemrakarsa' required />
                        </div>

                        <div className='form-control w-full'>
                            <label className="label font-bold">Penandatangan</label>
                            <input type="text" value={signedBy} onChange={(e) => setSignedBy(e.target.value)} className="input input-bordered" placeholder='Penandatangan' required />
                        </div>

                        <div>
                            <label className="label font-bold">Tanggal Penerbitan</label>
                            <Datepicker primaryColor="blue" useRange={false} asSingle={true} value={date} onChange={handleDate} />
                        </div>

                        <div className='form-control w-full'>
                            <label className="label font-bold">Tempat Penerbitan</label>
                            <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} className="input input-bordered" placeholder='Kota Penerbitan' required />
                        </div>
                        <div className="columns-2">
                            <div className='form-control w-full'>
                                <label className="label font-bold">Visibiliatas</label>
                                <select value={visibility} onChange={(e) => setVisibility(e.target.value)} className="select select-bordered">
                                    {visibilities.map((visibility) => {
                                        return <option key={visibility}>{visibility}</option>
                                    })}
                                </select>
                            </div>
                            <div className='form-control w-full'>
                                <label className="label font-bold">Status</label>
                                <select value={status
                                    ? 'Berlaku'
                                    : 'Tidak Berlaku'
                                } onChange={handleStatus} className="select select-bordered">
                                    <option >Berlaku</option>
                                    <option>Tidak Berlaku</option>
                                </select>
                            </div>
                        </div>

                        <div className='form-control w-full'>
                            <label className="label font-bold">Berkas Dokumen</label>
                            <input type="file" className="file-input file-input-bordered file-input-ghost w-full" onChange={handleFileChange} required />
                        </div>


                        <div className='modal-action'>
                            <button type="button" className="btn" onClick={handleModal}>Tutup</button>
                            {!isMutating ? (
                                <button type="submit" className="btn btn-primary">Simpan</button>
                            ) : (
                                <button type="button" className="btn btn-primary" disabled>Menyimpan...</button>
                            )}

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddDocument