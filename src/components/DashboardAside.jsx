import React, { useState } from 'react'
import { RxDashboard } from "react-icons/rx";
import { MdOutlineExpandMore, MdArrowForwardIos } from "react-icons/md";
import { CgMenu, CgMenuMotion } from "react-icons/cg";

function DashboardAside({ arr = [], setPage }) {
    // const [sideBar, setSideBar] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <aside className="bg-white h-screen w-fit p-4 shadow-md flex flex-col">
            <div className='mb-10 flex justify-between items-center px-2'>
                <h1 className="text-2xl font-bold ">TeethBooker</h1>
                {/* <button className='text-2xl' onClick={() => setSideBar(!sideBar)}>
                    {sideBar ? <CgMenuMotion /> : <CgMenu /> }
                </button> */}
            </div>
            <nav className='flex flex-col flex-grow'>
                <ul className="flex-grow space-y-4 mb-auto">
                    <li className="">
                        <a href="/dashboard" aria-label="Dashboard"
                            className="flex items-center text-gray-500 w-full p-2"
                        >
                            <RxDashboard className="mr-4" />
                            <span>Dashboard</span>
                        </a>
                    </li>
                    {
                        arr.map((item) => (
                            <li key={item.id}
                                className="transition-transform duration-200 transform hover:bg-blue-700 rounded-md group"
                            >
                                <button
                                    onClick={() => setPage(item.id)}
                                    className="flex items-center justify-between w-full p-2 text-gray-400 hover:text-white transition-colors focus:outline-none"
                                >
                                    <div className="flex items-center">
                                        {item.icon}
                                        <span className="capitalize">{item.name}</span>
                                    </div>
                                    <MdArrowForwardIos className={`text-sm transition-transform duration-200 group-hover:transform group-hover:translate-x-1`} />
                                </button>
                            </li>
                        )
                        )
                    }
                </ul>
                <div className="relative flex-grow-0 flex items-center mt-4">
                    <img src="https://i.pravatar.cc/100" alt="User Avatar" className="w-10 h-10 rounded-full object-cover" />
                    <div className="ml-4">
                        <p className="text-gray-800 text-sm">John Doe</p>
                        <p className="text-gray-600 text-sm">john.doe@example.com</p>
                    </div>
                    <button
                        aria-label="Expand user options"
                        className="ml-4 font-bold text-xl text-gray-600 hover:text-gray-800 transition-colors duration-200"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <MdOutlineExpandMore />
                    </button>
                    {isOpen && (
                        <div className="absolute right-0 bottom-11 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            <ul className="py-2">
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        </aside>
    )
}

export default DashboardAside;