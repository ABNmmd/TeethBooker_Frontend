import React from 'react'
import { RxDashboard } from "react-icons/rx";
import { MdOutlineExpandMore, MdArrowForwardIos } from "react-icons/md";

function DashboardAside({ arr = [] }) {
    return (
        <aside className="bg-white h-screen w-fit p-4 shadow-md flex flex-col">
            <h1 className="text-2xl font-bold mb-10 text-center">TeethBooker</h1>
            <nav className='flex flex-col flex-grow'>
                <ul className="flex-grow space-y-4 mb-auto px-3">
                    <li className="">
                        <a href="/dashboard" aria-label="Dashboard"
                            className="flex items-center text-gray-800 hover:text-blue-600 transition-colors"
                        >
                            <RxDashboard className="mr-4 text-gray-600" />
                            Dashboard
                        </a>
                    </li>
                    {
                        arr.map((item, index) => (
                            <li key={index} className="">
                                <button
                                    onClick={() => console.log(`Clicked on ${item.name}`)}
                                    className="flex items-center justify-between p-2 w-full text-gray-800 hover:text-blue-600 rounded-lg transition-colors focus:outline-none"
                                >
                                    <div className="flex items-center">
                                        {item.icon}
                                        <span className="ml-2">{item.name}</span>
                                    </div>
                                    <MdArrowForwardIos className="text-gray-600" />
                                </button>
                            </li>
                        )
                        )
                    }
                </ul>
                <div className="flex-grow-0 flex items-center mt-4">
                    <img src="https://i.pravatar.cc/100" alt="User Avatar" className="w-10 h-10 rounded-full object-cover" />
                    <div className="ml-4">
                        <p className="text-gray-800 text-sm">John Doe</p>
                        <p className="text-gray-600 text-sm">john.doe@example.com</p>
                    </div>
                    <button
                        aria-label="Expand user options"
                        className="ml-4 font-bold"
                    >
                        <MdOutlineExpandMore />
                    </button>
                </div>
            </nav>
        </aside>
    )
}

export default DashboardAside;