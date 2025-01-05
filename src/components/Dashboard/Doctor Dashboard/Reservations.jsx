import React, { useContext, useEffect } from 'react'
import { ReservationContext } from '../../../contexts/ReservationContext';
import { MainContext } from '../../../contexts/MainContext';
import { DoctorContext } from '../../../contexts/DoctorContext';
import { PatientContext } from '../../../contexts/PatientContext';

export default function Reservations() {

  

    const {reservations,setReservations, getReservation} = useContext(ReservationContext);
    const {getDoctor} = useContext(DoctorContext);
    const {getPatient} = useContext(PatientContext);
    const {user} = useContext(MainContext);

    
    useEffect(() => {
      if (user) {
        // Fetch reservations initially
        getReservation();
      }
    }, [user]);
    
    
  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Patient Full Name</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {reservations?.length > 0 ? (
            reservations.map((reservation, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 px-4 py-2">
                  {reservation.patient?.full_name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {reservation.date}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {reservation.patient_description || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {reservation.price} USD
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {reservation.status}
                </td>
                <td className="border border-gray-300 px-4 py-2 space-x-2">
                  <button class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                      View
                  </button>
                  <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      Update
                  </button>
                    <button class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
                        Delete
                    </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="border border-gray-300 px-4 py-2 text-center"
              >
                No reservations available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
