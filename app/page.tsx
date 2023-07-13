import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import SeachbarHome from '@/components/SeachbarHome'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"


export default async function Home() {
  const session = await getServerSession(authOptions)
  console.log(session?.user)

  return (
    <main>
      <Navbar />
      <div>
        <div className="hero min-h-full bg-base-200 py-56">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div>
              <h1 className="text-6xl font-bold my-2">Sistem <br />Peraturan </h1>
              <h2 className='text-3xl font-bold my-2'>UIN Malang</h2>
              <SeachbarHome />
            </div>
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </main>
  )
}
