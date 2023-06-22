import React from 'react'

const TopbarAdmin = ({ menuTitle }: { menuTitle: String }) => {
    return (
        <div className="card w-full bg-base-100 shadow-sm mb-4">
            <div className="card-body">
                <h2 className="card-title">{menuTitle}</h2>
            </div>
        </div>
    )
}

export default TopbarAdmin