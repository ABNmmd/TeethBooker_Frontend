import React from 'react'
import { FaBell } from 'react-icons/fa';

const dentists = [
    { id: 1, name: 'D. Ahmed', image: 'https://via.placeholder.com/50' },
    { id: 2, name: 'D. Amale', image: 'https://via.placeholder.com/50' },
    { id: 3, name: 'D. Bilal', image: 'https://via.placeholder.com/50' },
    { id: 4, name: 'D. Anas', image: 'https://via.placeholder.com/50' },
];
const appointments = [
    { id: 1, dentist: 'D. Ahmed', date: '2023-10-30', time: '10:00 AM', price: '$100' },
    { id: 2, dentist: 'D. Amale', date: '2023-10-25', time: '11:00 AM', price: '$150' },
];

const upcomingReservations = [
    { id: 1, dentist: 'D. Ahmed', date: '2023-11-05', time: '09:00 AM' },
    { id: 2, dentist: 'D. Amale', date: '2023-11-10', time: '02:00 PM' },
];

function DashboardDefult() {
    return (
        <div className="grid grid-cols-1 gap-6 px-6">
            {/* Welcome Message and Search Box */}
            <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold">Hello, John Doe</h2>
                </div>
                <div className="flex items-center space-x-4">
                    <input
                        type="search"
                        name="search"
                        id="search"
                        placeholder="Search..."
                        className="border border-gray-300 rounded-lg p-2 w-full max-w-xs"
                    />
                    <button className="text-gray-600 focus:outline-none">
                        <FaBell className="h-6 w-6" />
                    </button>
                </div>
            </div>

            {/* Reservations and Top Dentists Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Last Reservation Box */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold">Upcoming Reservations</h2>
                    <ul className="mt-2 space-y-2">
                        {upcomingReservations.map(reservation => (
                            <li key={reservation.id} className="flex justify-between p-2 border-b hover:bg-gray-100">
                                <div>
                                    <span className="font-semibold">{reservation.dentist}</span>
                                    <p className="text-gray-600">{reservation.date} at {reservation.time}</p>
                                </div>
                                <button className="text-blue-500">View Details</button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Top Dentists Box */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold">Top Dentists</h2>
                    <ul className="mt-2 space-y-2">
                        {dentists.map(dentist => (
                            <li key={dentist.id} className="flex items-center justify-between p-2 border-b hover:bg-gray-100 cursor-pointer">
                                <div className="flex items-center space-x-2">
                                    <img src={dentist.image} alt={dentist.name} className="w-12 h-12 rounded-full" />
                                    <span className="block font-semibold">{dentist.name}</span>
                                </div>
                                <button className="text-blue-500">View Profile</button>
                            </li>
                        ))}
                    </ul>
                    <button className="mt-4 bg-blue-500 text-white rounded-lg px-4 py-2">View More Dentists</button>
                </div>

                {/* Last Appointment History Box */}
                <div className="bg-white shadow-md rounded-lg p-4 md:col-span-2">
                    <h2 className="text-xl font-semibold">Last Appointment History</h2>
                    <table className="min-w-full mt-4">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-4 text-left">Dentist</th>
                                <th className="py-2 px-4 text-left">Date</th>
                                <th className="py-2 px-4 text-left">Time</th>
                                <th className="py-2 px-4 text-left">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map(appointment => (
                                <tr key={appointment.id} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-4">{appointment.dentist}</td>
                                    <td className="py-2 px-4">{appointment.date}</td>
                                    <td className="py-2 px-4">{appointment.time}</td>
                                    <td className="py-2 px-4">{appointment.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DashboardDefult;