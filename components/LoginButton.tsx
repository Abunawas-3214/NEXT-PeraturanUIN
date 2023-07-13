'use client'
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
const LoginButton = ({ username, author }: { username?: String, author?: boolean }) => {
    const { data: session } = useSession()
    if (session) {
        return (
            <ul className="menu menu-horizontal px-1">
                <li>
                    <details>
                        <summary>
                            {username}
                        </summary>
                        <ul className="p-2 bg-base-100">
                            {(author) ? <li><Link href={'/admin'}>Admin</Link></li> : ''}
                            <li><a onClick={() => signOut()}>Keluar</a></li>
                        </ul>
                    </details>
                </li>
            </ul>
        )
    }
    return (
        <div>
            <button onClick={() => signIn()} className="btn btn-primary">Masuk</button>
        </div>
    )
}

export default LoginButton