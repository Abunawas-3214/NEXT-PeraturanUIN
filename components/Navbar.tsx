import Link from "next/link"
import LoginButton from './LoginButton'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"


const Navbar = async () => {
    const session = await getServerSession(authOptions)
    return (
        <div>
            <div className="navbar bg-base-100 px-20">
                <div className="navbar-start">
                    <div className="dropdown">
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Item 1</a></li>
                            <li><a>Item 3</a></li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">Peraturan UIN Malang</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link href='/'>Beranda</Link></li>
                        <li><Link href='/document'>Daftar Dokumen</Link></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    {(!session) ? <LoginButton /> : <LoginButton username={session.user.name as string} author={session.user.author as boolean} />}
                </div>
            </div>
        </div>
    )
}

export default Navbar