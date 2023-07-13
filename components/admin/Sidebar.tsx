import Link from "next/link"
import LogoImg from "@/public/img/UIN-Green.png"
import Image from "next/image"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import AcountControll from "./AcountControll"

export default async function Sidebar({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions)
    console.log(session?.user)

    return (
        <>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col w-auto px-8">

                    <label htmlFor="my-drawer-2" className="btn drawer-button max-w-sm lg:hidden">Open drawer</label>
                    {children}
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <div className="flex flex-col p-4 w-72 h-full bg-base-200 text-base-content gap-4">
                        <div className="bg-base-200 h-44 grid justify-items-center content-center gap-2 mt-6">
                            <Link href="/">
                                <Image src={LogoImg} alt="Logo" height={100} />
                                <h1>Sistem Peraturan</h1>
                            </Link>
                        </div>
                        <ul className="menu grow h-full">
                            {/* Sidebar content here */}
                            <li><Link href="/admin">Dashboard</Link></li>
                            <li><Link href="/admin/document">Dokumen</Link></li>
                            <li><Link href="/admin/category">Kategori</Link></li>
                            {(session?.user.role === "ADMIN") ? <li><Link href="/admin/user">User</Link></li> : ''}
                        </ul>
                        <AcountControll username={session?.user.name} email={session?.user.email} role={session?.user.role} />
                    </div>
                </div>
            </div>
        </>
    )
}