import Link from 'next/link'
import React from 'react'

type Document = {
    id: string,
    title: string,
    slug: string,
    category: {
        name: string
    }
    visibility: string
}

const DocumentCard = ({ document }: { document: Document }) => {
    return (
        <>
            <Link href={`/document/${document.slug}`} className="card card-side bg-base-100 border w-auto h-56 hover:shadow-md">
                <div className="card-body">
                    <h2 className="card-title h-full line-clamp-3 align-text-top">{document.title}</h2>
                    <div className="divider"></div>
                    <div className='flex justify-between'>
                        <p>{document.category.name}</p>
                        <p className='text-right'>{document.visibility}</p>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default DocumentCard