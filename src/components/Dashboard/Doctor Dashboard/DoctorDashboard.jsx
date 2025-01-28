import React, { useState } from 'react';
import DashboardAside from '../DashboardAside';
import { FaCalendarAlt } from "react-icons/fa";
import { IoSettingsOutline,IoAnalytics  } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";


import Settings from '../Settings';
import DashboardDefult from '../Doctor Dashboard/DashboardDefult';
import Reservations from './Reservations';

const arr = [
    { id: 1, name: 'Dashboard', icon: <RxDashboard className='' />, component: <DashboardDefult /> },
    { id: 2, name: 'Reservations', icon: <FaCalendarAlt className='' />, component: <Reservations /> },
    { id: 3, name: 'Settings', icon: <IoSettingsOutline className='' />, component: <Settings /> },
];

function DoctorDashboard() {
    const [page, setPage] = useState(0);
    return (
        <div className="flex min-h-screen bg-white">
            <DashboardAside arr={arr} setPage={setPage} />
            <div className="flex-1 p-6 bg-gray-100 h-screen overflow-y-scroll">
                {
                    page == 0
                        ? <DashboardDefult />
                        : arr[page - 1].component
                }
            </div>
        </div>
    )
}

export default DoctorDashboard;