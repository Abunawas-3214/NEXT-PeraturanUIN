import Navbar from "@/components/Navbar";

export default function DocumentLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            {children}
        </>

    )
}
