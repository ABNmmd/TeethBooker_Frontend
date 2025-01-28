import React, { useContext, useEffect, useState } from 'react'
import { FaBell } from 'react-icons/fa';
import { MainContext } from '../../../contexts/MainContext';
import { ReservationContext } from '../../../contexts/ReservationContext';
import { LineChart } from '@mui/x-charts/LineChart';



function DashboardDefult() {

    const d = new Date();

    const {getTodayReservation,todayReservations,getReservation,reservations} = useContext(ReservationContext);
    const {user} = useContext(MainContext);

    const [upcomingReservations,setUpcomingReservations] = useState([]);
    const [reservationsHistory,setReservationsHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);
    const [currentYear, setCurrentYear] = useState(d.getFullYear());

    useEffect(() => {
        if (user) {
            setIsLoading(true);
            getTodayReservation()
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
        dateTarget.setHours(0, 0, 0, 0);

        return today >= dateTarget;
    }

    function equalDates(date){
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const [day, month, year] = date.split('-');
        const dateTarget = new Date(`${year}-${month}-${day}`);

        dateTarget.setHours(0, 0, 0, 0);


        if (today.getTime() == dateTarget.getTime()) return 1;
        else return 0;
    }

    function calculeRevenue() {
        let revenue = 0;
            reservations.forEach(reserv => {
                if(reserv.status == 'done' && equalDates(reserv.date)){
                    revenue = revenue + reserv.price;
                }
            });
            return revenue;
    }    

    

    function splitReservationDate(date) {
        const [day, month, year] = date.split('-');
        return { day, month, year };
    }

    function removeDuplicates(arr) {
        return [...new Set(arr)];
    }

    function monthsData(){
        let reservationMonths = [];
        reservationsHistory.forEach((reserv) => {
            const { year: reservationYear, month: reservationMonth } = splitReservationDate(reserv.date);
            if (
              // add compareWithToday function (later)
              reserv.status == 'done' &&
              reservationYear == currentYear
            ) {
              reservationMonths.push(parseInt(reservationMonth));
            }
          });

        return reservationMonths;
    }

    let finalMonthData = removeDuplicates(monthsData());

    function revenuesData() {
        let revenues = Array(12).fill(0); // Initialize with 12 months and 0 revenue for each
        let filteredReservations = reservationsHistory?.filter(checkDoneAndOld);
      
        filteredReservations.forEach((reservation) => {
          const { month } = splitReservationDate(reservation.date);
          const monthIndex = month - 1; // Adjust for 0-based indexing
      
          if (monthIndex >= 0 && monthIndex < 12) {
            revenues[monthIndex] += reservation.price;
          }
        });
      
        return revenues;
    }  

    function reservationsData() {
        let reservationsNumber = Array(12).fill(0); // Initialize with 12 months and 0 revenue for each
        let filteredReservations = reservationsHistory?.filter(checkDoneAndOld);
      
        filteredReservations.forEach((reservation) => {
          const { month } = splitReservationDate(reservation.date);
          const monthIndex = month - 1; // Adjust for 0-based indexing
      
          if (monthIndex >= 0 && monthIndex < 12) {
            reservationsNumber[monthIndex] += 1;
          }
        });
      
        return reservationsNumber;
    } 

    const monthsOfYear = [1,2,3,4,5,6,7,8,9,10,11,12];
      

    function checkDoneAndOld(reservation){
        const { year: reservationYear, month: reservationMonth } = splitReservationDate(reservation.date);
        return  reservation.status == 'done' &&
                reservationYear == currentYear;
                // add compareWithToday function (later)
    }

    const thisYear = d.getFullYear();

    const handleYearChange = (event) => {
        setCurrentYear(parseInt(event.target.value)); 
    };      
    

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

                {/* Today revenue */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold">Today Revenue</h2>
                    {
                        isLoading2 ? ( <div>Loading...</div> ) : (
                            <div className="bg-white shadow-md rounded-lg p-4">
                                <p className="text-2xl font-semibold text-green-500">{calculeRevenue()} $</p>
                            </div>
                        )
                    }
                    
                </div>

                {/* Last Appointment History Box */}
                <div className="bg-white shadow-md rounded-lg p-4 md:col-span-2">
                    <h2 className="text-xl font-semibold">Reservations History</h2>
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

                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold">Monthly Reservations</h2>
                    {
                        isLoading2 ? ( <div>Loading...</div> ) : (
                            <LineChart
                                xAxis={[{ data: monthsOfYear }]}
                                series={[
                                    {
                                    data: reservationsData(),
                                    },
                                ]}
                                width={500}
                                height={300}
                            />
                        )
                    }
                    
                </div>

                {/* Total Revenue */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <div className='flex flex-row justify-center items-center space-x-4'>
                        <h2 className="text-xl font-semibold">Monthly Revenue</h2>
                        <select 
                            value={currentYear} 
                            onChange={handleYearChange} 
                        >
                            <option value={`${thisYear}`}>{thisYear}</option>
                            <option value={`${thisYear-1}`}>{thisYear-1}</option>
                            <option value={`${thisYear-2}`}>{thisYear-2}</option>
                            <option value={`${thisYear-3}`}>{thisYear-3}</option>
                        </select>
                    </div>
                    {
                        isLoading2 ? ( <div>Loading...</div> ) : (
                            <LineChart
                                xAxis={[{ data: monthsOfYear }]}
                                series={[
                                    {
                                    data: revenuesData(),
                                    },
                                ]}
                                width={500}
                                height={300}
                            />
                        )
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default DashboardDefult;