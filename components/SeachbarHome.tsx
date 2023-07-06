'use client'
import { useState } from 'react'

const SeachbarHome = () => {
    const [search, setSearch] = useState('')

    return (
        <div>
            <form className="flex flex-row gap-4 mt-8">
                <input type="text" placeholder="Cari Dokumen" className="input input-bordered w-96 max-w-md" value={search} onChange={(e) => setSearch(e.target.value)} />
                <button type='submit' className="btn btn-primary" >Cari</button>
            </form>
        </div>
    )
}

export default SeachbarHome