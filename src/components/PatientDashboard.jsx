import React, { useState } from 'react';
import DashboardAside from './DashboardAside';
import { FaUserDoctor } from "react-icons/fa6";
import { FaHistory, FaCalendarAlt } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

import MyAppointments from './MyAppointments';
import DoctorsListing from './DoctorsListing';
import PatientHistory from './PatientHistory';
import Settings from './Settings';
import DashboardDefult from './DashboardDefult';

const arr = [
    { id: 1, name: 'My Appointments', icon: <FaCalendarAlt className='mr-4' />, component: <MyAppointments /> },
    { id: 2, name: 'Doctors', icon: <FaUserDoctor className='mr-4' />, component: <DoctorsListing /> },
    { id: 3, name: 'History', icon: <FaHistory className='mr-4' />, component: <PatientHistory /> },
    { id: 4, name: 'Settings', icon: <IoSettingsOutline className='mr-4' />, component: <Settings /> },
];

function PatientDashboard() {
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

export default PatientDashboard;