'use client'
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
export default function Error({ error, reset }: { error: Error, reset: () => void }) {
    return (
        <div>
            <div className=" flex flex-col gap-8 items-center  text-center h-screen">
                <h1 className="text-6xl font-bold text-red-600">{error.message}</h1>
                <div className="flex flex-row-2 gap-8 max-w-lg ">
                    <button onClick={() => reset()} className="btn btn-primary">kembali</button>
                    <button onClick={() => signIn()} className="btn btn-primary">masuk</button>
                </div>
            </div>
        </div>
    )
}
