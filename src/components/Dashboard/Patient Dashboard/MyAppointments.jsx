import React, { useState } from 'react'
import { MdDelete, MdEditSquare } from "react-icons/md";

const appointments = [
    { id: 1, patientName: 'John Doe', date: '2023-06-15', time: '09:00 AM', treatment: 'Cleaning' },
    { id: 2, patientName: 'Jane Smith', date: '2023-06-15', time: '10:30 AM', treatment: 'Filling' },
    { id: 3, patientName: 'Bob Johnson', date: '2023-06-16', time: '02:00 PM', treatment: 'Root Canal' },
    { id: 4, patientName: 'Alice Brown', date: '2023-06-17', time: '11:00 AM', treatment: 'Check-up' },
    { id: 5, patientName: 'Charlie Davis', date: '2023-06-17', time: '03:30 PM', treatment: 'Wisdom Tooth Extraction' },
]

function MyAppointments() {

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">My Appointments</h1>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Add Appointment
                </button>
            </div>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 text-left text-gray-600">Patient Name</th>
                            <th className="px-4 py-2 text-left text-gray-600 cursor-pointer">
                                <div className="flex items-center">
                                    Date
                                </div>
                            </th>
                            <th className="px-4 py-2 text-left text-gray-600">Time</th>
                            <th className="px-4 py-2 text-left text-gray-600">Treatment</th>
                            <th className="px-4 py-2 text-left text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {appointments.map((appointment) => (
                            <tr key={appointment.id}>
                                <td className="px-4 py-2">{appointment.patientName}</td>
                                <td className="px-4 py-2">{appointment.date}</td>
                                <td className="px-4 py-2">{appointment.time}</td>
                                <td className="px-4 py-2">{appointment.treatment}</td>
                                <td className="px-4 py-2 text-xl">
                                    <button className="text-blue-500 hover:text-blue-600 mr-2"><MdEditSquare /></button>
                                    <button className="text-red-500 hover:text-red-600"><MdDelete /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MyAppointments;