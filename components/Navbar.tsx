import Link from "next/link"


const Navbar = () => {
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
                    <a className="btn">Masuk</a>
                </div>
            </div>
        </div>
    )
}

export default Navbar