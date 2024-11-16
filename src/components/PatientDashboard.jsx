import React from 'react'
import DashboardAside from './DashboardAside';
import { FaUserDoctor } from "react-icons/fa6";
import { FaHistory, FaCalendarAlt } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

const arr = [
    {name: 'My Appointments', icon: <FaCalendarAlt className='mr-4' />},
    {name: 'Doctors', icon: <FaUserDoctor className='mr-4' />},
    {name: 'History', icon: <FaHistory className='mr-4' />},
    {name: 'Settings', icon: <IoSettingsOutline className='mr-4' />},
];

function PatientDashboard() {
    return (
        <div className="flex min-h-screen bg-white">
            <DashboardAside arr={arr} />
            <div className="flex-1 p-6 bg-gray-100">
                <h1 className="text-3xl font-bold mb-4">Patient Dashboard</h1>
                <p className="text-gray-700">
                    Welcome to your dashboard! Here you can manage your appointments, view your medical history, and more.
                </p>
            </div>
        </div>
    )
}

export default PatientDashboard;