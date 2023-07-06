'use client'
import React, { SyntheticEvent } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Role } from '@prisma/client'

type User = {
    id: number,
    name: string,
    email: string,
    password: string,
    role: string,
    author: boolean
}

const UpdateUser = ({ user }: { user: User }) => {
    const [name, setName] = React.useState(user.name)
    const [email, setEmail] = React.useState(user.email)
    const [password, setPassword] = React.useState('')
    const [role, setRole] = React.useState(user.role)
    const [author, setAuthor] = React.useState(user.author)

    const [isMutating, setIsMutating] = React.useState(false)
    const [isOpen, setIsOpen] = React.useState(false)

    const roles = Object.keys(Role)

    const router = useRouter()

    const handleUpdate = async (e: SyntheticEvent) => {
        setIsMutating(true)
        e.preventDefault()
        await axios.patch(`/api/users/${user.id}`, {
            name: name,
            email: email,
            password: password,
            role: role,
            author: author
        })
        setIsMutating(false)

        router.refresh()
        setIsOpen(false)
    }
    const handleModal = () => {
        setIsOpen(!isOpen)
        if (isOpen == false) {
            setName(user.name)
            setEmail(user.email)
            setPassword('')
            setRole(user.role)
            setAuthor(user.author)
        }
    }

    const handleCheck = () => {
        setAuthor(!author)
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
                        <div className='form-control w-full'>
                            <label className="label font-bold">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input input-bordered" placeholder='Email' required />
                        </div>
                        <div className='form-control w-full'>
                            <label className="label font-bold">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-bordered" placeholder='******' />
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

export default UpdateUser