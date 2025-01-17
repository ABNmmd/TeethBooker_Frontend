import React, { useContext, useEffect, useState } from 'react'
import { ReservationContext } from '../../../contexts/ReservationContext';
import { MainContext } from '../../../contexts/MainContext';
import { DoctorContext } from '../../../contexts/DoctorContext';
import { PatientContext } from '../../../contexts/PatientContext';

export default function Reservations() {

  

    const {reservations,setReservations, getReservation,updateReservation,createPatientHistory} = useContext(ReservationContext);
    const {getDoctor} = useContext(DoctorContext);
    const {getPatient} = useContext(PatientContext);
    const {user} = useContext(MainContext);

    const [history, setHistory] = useState(false);
    const [targetId, setTargetId] = useState(null);
    const [description, setDescription] = useState('');
    
    useEffect(() => {
      if (user) {
        // Fetch reservations initially
        getReservation();
      }
    }, [user]);

    function handleStatusChange(id,statusTarget) {

          setReservations((prevReservations) => 
            prevReservations.map((reservation) =>
                reservation.id === id
                    ? { ...reservation, status: 'Loading ...' }
                    : reservation
              )
          );

          if(statusTarget == 'done'){
            setHistory(true);
            setTargetId(id);
          }else{
            updateReservation(id,statusTarget)
            .then((updatedReservation) => {
              if (updatedReservation) {
                    setReservations((prevReservations) => 
                      prevReservations.map((reservation) =>
                          reservation.id === id
                              ? { ...reservation, status: statusTarget }
                              : reservation
                      )
                    );
                  }
              
            })
            .catch((error) => {
              console.error("Failed to update reservation status:", error);
            });
          }
        
    }

    function updateToDone(reservation_id){

      createPatientHistory(reservation_id,description);
      
      updateReservation(reservation_id,'done')
      .then((updatedReservation) => {
        if (updatedReservation) {
          setReservations((prevReservations) => 
            prevReservations.map((reservation) =>
                reservation.id === reservation_id
                    ? { ...reservation, status: 'done' }
                    : reservation
            )
          );
          setHistory(false);
        }
        
      })
      .catch((error) => {
        console.error("Failed to update reservation status:", error);
      });
    }    
    
    
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
            <th className="border border-gray-300 px-4 py-2">Update Satatus</th>
            <th className={`border border-gray-300 px-4 py-2 ${history ? '' : 'hidden'}`}>description</th>
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
                    <select disabled={reservation.status == 'done'} id="status"
                            name="status"
                            onChange={(e) => handleStatusChange(reservation.id, e.target.value)}
                            className="border border-gray-300 px-4 py-2">
                      <option value={`${reservation.status}`}>Choose status</option>
                      <option value="not yet">Not yet</option>
                      <option value="in process">In process</option>
                      <option value="done">Done</option> 
                      <option value="declined">Declined</option> 
                      <option value="canceled">Canceled</option> 
                    </select>
                </td>
                <td className={`flex flex-row border space-x-4 items-center justify-center border-gray-300 px-4 py-2 ${history && reservation.id == targetId ? '' : 'hidden'}`}>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                  <button onClick={() => updateToDone(reservation.id)}  className='px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300'>Update</button>
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
