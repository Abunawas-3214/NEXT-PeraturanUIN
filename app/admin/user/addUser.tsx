'use client'
import React, { SyntheticEvent } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Role } from '@prisma/client'

const AddUser = () => {
    const roles = Object.keys(Role)

    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [role, setRole] = React.useState(roles[roles.length - 1])
    const [author, setAuthor] = React.useState(false)

    const [isMutating, setIsMutating] = React.useState(false)
    const [isOpen, setIsOpen] = React.useState(false)

    const router = useRouter()
    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        setIsMutating(true)
        await axios.post('/api/users', {
            name: name,
            email: email,
            password: password,
            role: role,
            author: author
        })

        setIsMutating(false)

        setName('')
        setEmail('')
        setPassword('')
        setRole(roles[roles.length - 1])
        setAuthor(false)

        router.refresh()
        setIsOpen(false)
    }
    const handleModal = () => {
        setIsOpen(!isOpen)
    }

    const handleCheck = () => {
        setAuthor(!author)
    }

    return (
        <div>
            <button className="btn" onClick={handleModal}>Tambah Baru</button>
            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Tambah User</h3>
                    <form onSubmit={handleSubmit}>
                        <div className='form-control w-full'>
                            <label className="label font-bold">Nama</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input input-bordered" placeholder='Nama' required />
                        </div>
                        <div className='form-control w-full'>
                            <label className="label font-bold">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input input-bordered" placeholder='Email' required />
                        </div>
                        <div className='form-control w-full'>
                            <label className="label font-bold">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-bordered" placeholder='******' required />
                        </div>

                        <div className="columns-2">
                            <div className='form-control w-full'>
                                <label className="label font-bold">Role</label>
                                <select value={role} onChange={(e) => setRole(e.target.value)} className="select select-bordered">
                                    {roles.map((role) => {
                                        return <option key={role}>{role}</option>
                                    }).reverse()}
                                </select>
                            </div>
                            <div className='form-control w-full'>
                                <label className="label font-bold">Author</label>
                                <input type="checkbox" onChange={handleCheck} className="toggle" checked={author} />
                            </div>
                        </div>

                        <div className='modal-action'>
                            <button type="button" className="btn" onClick={handleModal}>Tutup</button>
                            {!isMutating ? (
                                <button type="submit" className="btn btn-primary">Simpan</button>
                            ) : (
                                <button type="submit" className="btn btn-primary">Menyimpan...</button>
                            )}

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddUser