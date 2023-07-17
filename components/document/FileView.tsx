'use client'

import { useState, useEffect } from "react"
import axios from 'axios'


const FileView = ({ documentId }: { documentId: string }) => {
    const [fileData, setFileData] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/documents/${documentId}`, { responseType: 'blob' })
                setFileData(URL.createObjectURL(res.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])
    return (
        <>
            <div>{documentId}</div>
            {
                (fileData !== '')
                    ? <embed src={fileData} className="w-full h-full" />
                    : <div className="w-full h-full flex justify-center">
                        <span className="loading loading-spinner loading-lg m-auto"></span>
                    </div>
            }
        </>

    )
}

export default FileView