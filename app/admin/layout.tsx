import Sidebar from '@/components/Sidebar'
import React from 'react'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-screen flex flex-row justify-start'>
            <Sidebar />
            <div className='bg-gray-50 flex-1 p-4 text-black'>
                {children}
            </div>
        </div>
    )
}

export default AdminLayout