'use client'
import { SyntheticEvent, useState } from 'react'
import type { Document, Category } from '@prisma/client'
import { Visibility } from '@prisma/client'
import Datepicker from 'react-tailwindcss-datepicker'
import { pathToFileURL } from 'url'

const UpdateDocument = ({ document, categories }: { document: Document, categories: Category[] }) => {
    const visibilities = Object.keys(Visibility)

    const [title, setTitle] = useState(document.title)
    const [category, setCategory] = useState(document.categoryId)
    const [subject, setSubject] = useState(document.subject)
    const [date, setDate] = useState({
        startDate: document.date,
        endDate: document.date
    })
    const [initiator, setInitiator] = useState(document.initiator)
    const [place, setPlace] = useState(document.place)
    const [signedBy, setSignedBy] = useState(document.signedBy)
    const [visibility, setVisibility] = useState(document.visibility)
    const [status, setStatus] = useState(document.status)
    const [attachment, setAttachment] = useState<File | null>(null)

    const [isOpen, setIsOpen] = useState(false)
    const [isMutating, setIsMutating] = useState(false)

    const attc: string = `.../attachment/${categories.find(c => c.id === Number(category))?.name as string}/${document.attachment}.pdf`

    const handleDate = (date: any) => {
        setDate(date)
    }

    const handleStatus = () => {
        setStatus(!status)
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
            <button className="btn btn-info btn-sm" onClick={handleModal}>Edit</button>
            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit Dokumen</h3>
                    <form action="">
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
                                <select value={category} onChange={(e) => setCategory(Number(e.target.value))} className="select select-bordered">
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
                                <select value={visibility} onChange={(e) => setVisibility(e.target.value as Visibility)} className="select select-bordered">
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

                        <div className="my-2">
                            <a href={attc}>Dokumen lama</a>
                        </div>

                        <div className='form-control w-full'>
                            <label className="label font-bold">Berkas Dokumen</label>
                            <input type="file" className="file-input file-input-bordered file-input-ghost w-full" onChange={handleFileChange} required />
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

        </>
    )
}

export default UpdateDocument