import Navbar from "@/components/Navbar";

export default function DocumentLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <div className='px-40 bg-white pt-4'>
                {children}
            </div>
        </>

    )
}
