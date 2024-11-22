import React, { useState } from 'react'

const appointmentHistory = [
    {
        id: 1,
        date: "2023-05-15",
        time: "10:00 AM",
        doctor: "Dr. Sarah Johnson",
        treatment: "Dental Cleaning",
        notes: "Regular cleaning performed. No issues found. Recommended flossing more frequently.",
    },
    {
        id: 2,
        date: "2023-05-10",
        time: "2:30 PM",
        doctor: "Dr. Michael Lee",
        treatment: "Orthodontic Adjustment",
        notes: "Braces tightened. Patient reported minor discomfort. Follow-up appointment scheduled in 4 weeks.",
    },
    {
        id: 3,
        date: "2023-05-05",
        time: "11:15 AM",
        doctor: "Dr. Emily Chen",
        treatment: "Cavity Filling",
        notes: "Small cavity filled on lower right molar. Patient tolerated procedure well. Advised on proper brushing techniques.",
    },
]



function PatientHistory() {
    const [expandedAppointments, setExpandedAppointments] = useState([])

    const toggleAppointment = (id) => {
        setExpandedAppointments(prev =>
            prev.includes(id) ? prev.filter(appointmentId => appointmentId !== id) : [...prev, id]
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Appointment History</h1>
            <div className="space-y-4">
                {appointmentHistory.map((appointment) => (
                    <div key={appointment.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => toggleAppointment(appointment.id)}>
                            <div>
                                <h2 className="text-lg font-semibold">{appointment.date}</h2>
                                <p className="text-sm text-gray-600">{appointment.treatment} with {appointment.doctor}</p>
                            </div>
                            <button
                                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                aria-expanded={expandedAppointments.includes(appointment.id)}
                                aria-controls={`appointment-details-${appointment.id}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transform ${expandedAppointments.includes(appointment.id) ? 'rotate-180' : ''} transition-transform`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                        {expandedAppointments.includes(appointment.id) && (
                            <div id={`appointment-details-${appointment.id}`} className="px-4 pb-4">
                                <p className="text-sm text-gray-700"><strong>Time:</strong> {appointment.time}</p>
                                <p className="text-sm text-gray-700"><strong>Doctor:</strong> {appointment.doctor}</p>
                                <p className="text-sm text-gray-700 mt-2"><strong>Doctor's Notes:</strong> {appointment.notes}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PatientHistory;