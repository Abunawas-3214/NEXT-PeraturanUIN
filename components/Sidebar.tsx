'use client'
import classNames from 'classnames'
import React, { useState, useMemo } from 'react'
import { ChevronDoubleLeftIcon, DocumentCheckIcon, DocumentIcon, HomeIcon, StarIcon, UserIcon } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

type Menu = {
    label: string;
    icon: React.ReactNode;
    link: string;
}

const menuItems: Menu[] = [
    { label: 'Dashboard', icon: <HomeIcon width={24} className='text-gray-600' />, link: '/admin' },
    { label: 'Dokumen', icon: <DocumentIcon width={24} className='text-gray-600' />, link: '/admin/document' },
    { label: 'Kategori', icon: <DocumentCheckIcon width={24} className='text-gray-600' />, link: '/admin/category' },
    { label: 'User', icon: <UserIcon width={24} className='text-gray-600' />, link: '/admin/user' },
]

const Sidebar = () => {
    const [toggleCollapse, setToggleCollapse] = useState(false)
    const [isCollapsible, setIsCollapsible] = useState(false)

    const pathname = usePathname()

    const wrapperClasses = classNames(
        'h-screen px-4 pt-8 pb-4 bg-light flex justify-between flex-col shadow-2xl', {
        ['w-72']: !toggleCollapse,
        ['w-20']: toggleCollapse
    })

    const collapseIconClasses = classNames(
        'p-4 rounded bg-light-lighter absolute right-0', {
        ['rotate-180']: toggleCollapse
    })

    const onMouseOver = () => {
        setIsCollapsible(!isCollapsible);
    };

    const handleSidebarToggle = () => {
        setToggleCollapse(!toggleCollapse);
    }


    return (
        <div className={wrapperClasses} onMouseEnter={onMouseOver} onMouseLeave={onMouseOver}
            style={{ transition: 'width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s' }}>
            <div className='flex flex-col'>
                <div className="flex items-center justify-between relative">
                    <div className="flex items-center pl-1 gap-4">
                        <StarIcon width={30} className='text-blue-600' />
                        <span className={classNames('mt-2 text-lg font-bold text-text', {
                            hidden: toggleCollapse,
                        })}>
                            Peraturan
                        </span>
                    </div>
                    {isCollapsible && (<button className={collapseIconClasses} onClick={handleSidebarToggle}>
                        <ChevronDoubleLeftIcon width={24} className='text-gray-600' />
                    </button>)}
                </div>

                <div className="flex flex-col items-start mt-24">
                    {menuItems.map((menu, index) => (
                        <div className='flex items-center cursor-pointer rounded w-full overflow-hidden whitespace-nowrap'>
                            <Link href={menu.link}
                                className={`flex py-4 px-3 items-center w-full h-full ${menu.link == pathname ? 'bg-gray-100' : ''} hover:bg-gray-100`}>

                                {menu.icon}

                                {!toggleCollapse && (
                                    <span className={classNames('text-md font-medium text-text-light mx-4')}>{menu.label}</span>
                                )}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

        </div >
    )
}

export default Sidebar