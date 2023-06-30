import React from 'react'

const Document = () => {
    return (
        <div className='px-40 bg-white'>
            <div className='input-group py-4'>
                <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                <button className="btn btn-primary">Cari Dokumnen</button>
            </div>
            <div className='flex gap-4'>
                <div className='flex-none w-72'>
                    <div className="card bg-white border">
                        <div className="card-body">
                            <>
                                <h2 className='card-title'>Urutkan Berdasarkan</h2>
                                <div className="card-actions">
                                    <button className="btn btn-outline btn-primary">Nama</button>
                                    <button className="btn btn-outline btn-primary">Waktu</button>
                                </div>
                            </>
                            <div className="divider"></div>
                            <>
                                <h2 className="card-title">Kategori</h2>
                                <select className="select select-bordered w-full max-w-xs">
                                    <option disabled selected>Pilih Kategori</option>
                                    <option>SK Rektor</option>
                                    <option>Peraturan Menteri</option>
                                </select>
                            </>
                            <div className="divider"></div>
                            <>
                                <h2 className="card-title">Jenis Dokumen</h2>
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text">Public</span>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                    <label className="label cursor-pointer">
                                        <span className="label-text">Private</span>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                    <label className="label cursor-pointer">
                                        <span className="label-text">Protected</span>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </div>
                            </>

                        </div>
                    </div>
                </div>
                <div className='grow h-screen bg-slate-600'>
                    <div className="card card-side bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">New movie is released!</h2>
                            <p>Click the button to watch on Jetflix app.</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Watch</button>
                            </div>
                        </div>
                    </div>
                    <div className="card card-side bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">New movie is released!</h2>
                            <p>Click the button to watch on Jetflix app.</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Watch</button>
                            </div>
                        </div>
                    </div>
                    <div className="card card-side bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">New movie is released!</h2>
                            <p>Click the button to watch on Jetflix app.</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Watch</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Document