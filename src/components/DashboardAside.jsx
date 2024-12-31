import React, { useState } from 'react'
import { RxDashboard } from "react-icons/rx";
import { MdOutlineExpandMore, MdArrowForwardIos } from "react-icons/md";
import { CgMenu, CgMenuMotion } from "react-icons/cg";

function DashboardAside({ arr = [], setPage }) {
    // const [sideBar, setSideBar] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible)
    }

    return (
        <aside className={`bg-white h-screen w-fit p-4 shadow-md flex ${!isSidebarVisible && "items-center"} flex-col transition-all duration-300 ease-in-out`}>
            <div className={`mb-10 ${isSidebarVisible && "flex justify-between items-center"} p-2`}>
                {isSidebarVisible && <h1 className="text-2xl font-bold">TeethBooker</h1>}
                <button className='text-2xl text-gray-600 hover:text-gray-800 transition-colors' onClick={toggleSidebar} aria-label={isSidebarVisible ? "Hide sidebar" : "Show sidebar"}>
                    {isSidebarVisible ? <CgMenuMotion /> : <CgMenu />}
                </button>
            </div>
            <nav className={`flex flex-col items-center flex-grow `}>
                <ul className={`flex-grow space-y-4 mb-auto ${isSidebarVisible && "w-full"}`}>
                    <li className="transition-transform duration-200 transform hover:bg-blue-700 rounded-md group">
                        <a href="/dashboard" aria-label="Dashboard"
                            className={`${isSidebarVisible && "flex items-center text-base"} text-xl block text-gray-500 w-full p-2 hover:text-white transition-colors focus:outline-none`}
                        >
                            <RxDashboard className="" />
                            {isSidebarVisible && <span className="ml-8 capitalize">Dashboard</span>}
                        </a>
                    </li>
                    {
                        arr.map((item) => (
                            <li key={item.id}
                                className="transition-transform duration-200 transform hover:bg-blue-700 rounded-md group"
                            >
                                <button
                                    onClick={() => setPage(item.id)}
                                    className={`${isSidebarVisible && "flex items-center justify-between text-base"} text-xl block w-full p-2 text-gray-400 hover:text-white transition-colors focus:outline-none`}
                                >
                                    <div className={isSidebarVisible && "flex items-center"}>
                                        {item.icon}
                                        {isSidebarVisible && <span className="ml-8 capitalize">{item.name}</span>}
                                    </div>
                                    {isSidebarVisible && <MdArrowForwardIos className={`text-sm transition-transform duration-200 group-hover:transform group-hover:translate-x-1`} />}
                                </button>
                            </li>
                        )
                        )
                    }
                </ul>
                <div className="relative flex-grow-0 flex items-center mt-4">
                    <img src="https://i.pravatar.cc/100" alt="User Avatar" className="w-9 h-9 rounded-full object-cover" />
                    {isSidebarVisible && (
                        <>
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
                        </>
                    )}
                    {isOpen && isSidebarVisible && (
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