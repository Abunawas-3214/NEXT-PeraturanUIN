const FilterControll = () => {
    return (
        <>
            <div className='flex-none w-72'>
                <div className="card border">
                    <div className="card-body">
                        <>
                            <h2 className="card-title">Kategori</h2>
                            <select className="select select-bordered w-full max-w-xs">
                                <option selected>Semua Kategori</option>
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
                                <label className="label cursor-pointer">
                                    <span className="label-text">Hiden</span>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </div>
                        </>

                    </div>
                </div>
            </div>
        </>
    )
}

export default FilterControll