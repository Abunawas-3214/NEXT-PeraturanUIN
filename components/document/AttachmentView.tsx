
import type { Document } from "@prisma/client"
import axios from 'axios'
import { useState, useEffect } from "react"


const AttachmentView = ({ fileURL, fileHeader }: { fileURL: string, fileHeader?: boolean }) => {

    return (
        <>
            {
                (fileURL !== '')
                    ? <embed src={`${fileURL}${!fileHeader ? '#toolbar=0&navpanes=0&scrollbar=0' : ''}`} className="w-full h-full" />
                    : <div className="w-full h-full flex justify-center">
                        <span className="loading loading-spinner loading-lg m-auto"></span>
                    </div>
            }
        </>
    )
}

export default AttachmentView