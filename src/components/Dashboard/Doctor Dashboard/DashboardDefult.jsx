import React, { useContext, useEffect, useState } from 'react'
import { FaBell } from 'react-icons/fa';
import { MainContext } from '../../../contexts/MainContext';
import { ReservationContext } from '../../../contexts/ReservationContext';


const dentists = [
    { id: 1, name: 'D. Ahmed', image: 'https://via.placeholder.com/50' },
    { id: 2, name: 'D. Amale', image: 'https://via.placeholder.com/50' },
    { id: 3, name: 'D. Bilal', image: 'https://via.placeholder.com/50' },
    { id: 4, name: 'D. Anas', image: 'https://via.placeholder.com/50' },
];

function DashboardDefult() {

    const {getTodayReservation,todayReservations,getReservation,reservations} = useContext(ReservationContext);
    const {user} = useContext(MainContext);

    const [upcomingReservations,setUpcomingReservations] = useState([]);
    const [reservationsHistory,setReservationsHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);

    useEffect(() => {
        if (user) {
            setIsLoading(true);
            getTodayReservation()
                .then(() => {
                    setUpcomingReservations(todayReservations?.reservations);
                })
                .catch((error) => {
                    console.error("Error fetching reservations:", error);
                 })
                .finally(() => setIsLoading(false));  

            setIsLoading2(true);
            getReservation()
                 .finally(() => setIsLoading2(false));  
            
        }
    }, [user]);
    

      
    useEffect(() => {
        setUpcomingReservations(todayReservations?.reservations);
    }, [todayReservations]);

    useEffect(() => {
        setReservationsHistory(reservations);
    }, [reservations]);



    function compareWithTodayDate(date){
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const [day, month, year] = date.split('-');
        const dateTarget = new Date(`${year}-${month}-${day}`);

        if (today > dateTarget) return 1;
        else return 0;
    }

    function calculeRevenue() {
        let revenue = 0;
        reservations.forEach(reserv => {
            if(reserv.status == 'done' && compareWithTodayDate(reserv.date)){
                revenue = revenue + reserv.price;
            }
        });

        return revenue;
    }
      

    return (
        <div className="grid grid-cols-1 gap-6 px-6">
            {/* Welcome Message and Search Box */}
            <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold">Hello, {user?.full_name}</h2>
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
                    <h2 className="text-xl font-semibold">Today Reservations</h2>
                    {
                        isLoading ? ( <div>Loading...</div> ) :


                        upcomingReservations?.length != 0 ? (
                        <ul className="mt-2 space-y-2">
                            {upcomingReservations?.map(reservation => (
                                <li key={reservation.id} className="flex justify-between p-2 border-b hover:bg-gray-100">
                                    <div className='flex justify-between space-x-4'>
                                        <span className="font-semibold">{reservation?.patient?.full_name}</span>
                                        <p className="text-gray-600">{reservation.date}</p>
                                    </div>
                                    <button className="text-blue-500">View Details</button>
                                </li>
                            ))}
                        </ul>) :
                        (<p className="text-gray-600">No upcoming reservations.</p>)
                    }
                </div>

                {/* Top Dentists Box */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold">Today Revenue</h2>
                    {
                        isLoading2 ? ( <div>Loading...</div> ) : (
                            <div className="bg-white shadow-md rounded-lg p-4">
                                <p className="text-2xl font-semibold text-green-500">{calculeRevenue()} $</p>
                                <button className="mt-4 bg-blue-500 text-white rounded-lg px-4 py-2">View More Stats</button>
                            </div>
                        )
                    }
                    
                </div>

                {/* Last Appointment History Box */}
                <div className="bg-white shadow-md rounded-lg p-4 md:col-span-2">
                    <h2 className="text-xl font-semibold">Last Appointment History</h2>
                    {
                        isLoading2 ? ( <div>Loading...</div> ) : 
                        (
                            <table className="min-w-full mt-4">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="py-2 px-4 text-left">Patient</th>
                                        <th className="py-2 px-4 text-left">Date</th>
                                        <th className="py-2 px-4 text-left">Price</th>
                                        <th className="py-2 px-4 text-left">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservationsHistory.map(reserv => (
                                        compareWithTodayDate(reserv.date) && reserv.status == 'done' ? (
                                            <tr key={reserv.id} className="border-b hover:bg-gray-50">
                                                <td className="py-2 px-4">{reserv.patient.full_name}</td>
                                                <td className="py-2 px-4">{reserv.date}</td>
                                                <td className="py-2 px-4">{reserv.price}</td>
                                                <td className="py-2 px-4">{reserv.status}</td>
                                            </tr>
                                        ) : null
                                    ))}
                                </tbody>
                            </table>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default DashboardDefult;