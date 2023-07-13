'use client'
import type { Role } from "@prisma/client"
import { signIn, signOut, useSession } from "next-auth/react"

const AcountControll = ({ username, email, role }: { username?: string | null, email?: string | null, role?: Role }) => {
    return (
        <>
            <div className="justify-self-end text-center">
                <h1>{username}</h1>
                <h5>{email}</h5>
                <h2>{role}</h2>
                <button className="btn btn-sm btn-ghost w-full mt-10" onClick={() => signOut()}>Keluar</button>
            </div>
        </>
    )
}

export default AcountControll