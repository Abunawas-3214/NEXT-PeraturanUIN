import Sidebar from '@/components/admin/Sidebar'
import React from 'react'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Sidebar>
            {children}
        </Sidebar>
    )
}

export default AdminLayout