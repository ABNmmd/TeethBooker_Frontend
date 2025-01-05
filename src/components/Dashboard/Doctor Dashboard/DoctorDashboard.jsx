import React, { useState } from 'react';
import DashboardAside from '../DashboardAside';
import { FaHistory, FaCalendarAlt,FaStethoscope } from "react-icons/fa";
import { IoSettingsOutline,IoAnalytics  } from "react-icons/io5";

import Settings from '../Settings';
import DashboardDefult from '../DashboardDefult';
import Reservations from './Reservations';
import MyPatients from './MyPatients';
import Analytics from './Analytics';

const arr = [
    { id: 1, name: 'Reservations', icon: <FaCalendarAlt className='' />, component: <Reservations /> },
    { id: 2, name: 'My Patients', icon: <FaStethoscope className='' />, component: <MyPatients /> },
    { id: 3, name: 'Analytics', icon: <IoAnalytics className='' />, component: <Analytics /> },
    { id: 4, name: 'Settings', icon: <IoSettingsOutline className='' />, component: <Settings /> },
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