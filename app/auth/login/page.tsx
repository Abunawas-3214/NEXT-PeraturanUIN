'use client'
import { useState, SyntheticEvent } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'


const LoginPage = () => {
    const { data: session } = useSession()
    if (session) {
        return redirect('/')
    }

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        const res = await signIn('credentials', {
            username: name,
            password: password,
            redirect: true,
        })
        console.log(res)
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left ml-8">
                    <h1 className="text-5xl font-bold">Sistem Peraturan UIN Malang</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-control mt-6">
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-4">
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <button type='submit' className="btn">Masuk</button>
                            </div>
                        </form>
                        <div className="divider"></div>
                        <button className="btn">Masuk dengan Google</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage