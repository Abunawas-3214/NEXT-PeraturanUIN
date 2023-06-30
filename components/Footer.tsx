import Image from 'next/image'
import logoUin from '../public/img/uin.png'
import logoAunQa from '../public/img/logo wajib/AunQa.png'
import logoBlu from '../public/img/logo wajib/blu.png'
import logoBanPt from '../public/img/logo wajib/banpt.png'
import logoJaz from '../public/img/logo wajib/jaz.png'
import logoMsc from '../public/img/logo wajib/msciso9001.png'
import logoPusaka from '../public/img/logo wajib/pusaka.png'
import logoMBKM from '../public/img/logo wajib/kampusmerdeka.png'

const Footer = () => {
    return (
        <div>
            <footer className="footer footer-center p-10 bg-base-300 text-base-content rounded">
                <div>
                    <div className="flex flex-row gap-28">
                        <div className='flex flex-row gap-4'>
                            <Image src={logoUin} alt="logo UIN Malang" width={80} height={80} />
                            <div className='text-left pt-2'>
                                <h1 className='text-4xl font-bold'>Peraturan</h1>
                                <h2 className='text-2xl font-medium'>UIN Malang</h2>
                            </div>
                        </div>
                        <div className='flex flex-row gap-3 p-4'>
                            <Image src={logoAunQa} alt="AunQa" height={50} />
                            <Image src={logoBlu} alt="BLU" height={50} />
                            <Image src={logoBanPt} alt="BanPT" height={50} />
                            <Image src={logoJaz} alt="Jaz" height={50} />
                            <Image src={logoMsc} alt="MSCIS" height={50} />
                            <Image src={logoPusaka} alt="Pusaka" height={50} />
                            <Image src={logoMBKM} alt="Kampus Merdeka" height={50} />
                        </div>
                    </div>
                </div>
            </footer>
            <footer className="footer footer-center p-4 bg-base-300 text-base-content">
                <div>
                    <p>Powered by PTIPD UIN Malang - 2023</p>
                </div>
            </footer>
        </div>
    )
}

export default Footer