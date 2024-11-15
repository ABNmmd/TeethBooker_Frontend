import React from 'react'
import DashboardAside from './DashboardAside';

const arr = [
    'Doctors',
    'History',
];

function PatientDashboard() {
    return (
        <div className="flex">
            <DashboardAside arr={arr} />
            <div className="flex-1 p-4">
                <h1 className="text-3xl font-bold mb-4">Patient Dashboard</h1>
            </div>
        </div>
    )
}

export default PatientDashboard;