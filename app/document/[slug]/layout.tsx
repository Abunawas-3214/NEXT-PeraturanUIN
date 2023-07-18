import React from 'react'
import FullDocument from './page'

export default function DetailDocumentLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    )
}
