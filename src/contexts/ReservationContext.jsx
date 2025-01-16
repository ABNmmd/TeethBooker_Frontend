import { createContext,useContext, useState } from "react";
import api from "../services/api";
import { MainContext } from "./MainContext";


const ReservationContext = createContext();

const ReservationProvider = ({ children }) => {

    const {token} = useContext(MainContext);

    const [reservations, setReservations] = useState([]);
    const [todayReservations, setTodayReservations] = useState([]);

    // create reservation
    const createReservation = async (data) => {
        try {
            const response = await api.post('/reservation', data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error creating Reservation', error);
        }
    }

    // get all time reservation
    const getReservation = async () => {
        try {
            const response = await api.get(`/reservation`, {
                params: { today: 0 },
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            setReservations(response?.data?.reservations);

        } catch (error) {
            console.error('Error getting Reservation', error);
        }
    }

    // get today reservation
    const getTodayReservation = async () => {
        try {
            const response = await api.get(`/reservation`, {
                params: { today: 1 },
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            setTodayReservations(response.data);
        } catch (error) {
            console.error('Error getting Reservation', error);
        }
    }

    // update reservation
    const updateReservation = async (reservationId, status) => {

        const data = {status}
        try {
            const response = await api.put(`/reservation/${reservationId}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error updating Reservation', error);
        }
    }

    // get patient history
    const getPatientHistory = async () => {
        try {
            const response = await api.get(`/reservation_history/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error getting Patient History', error);
        }
    }

    // create patient history
    const createPatientHistory = async (reservation_id,doctor_description) => {
        const payload = { doctor_description }; // Send a simple object
        try {
            const response = await api.post(`/reservation_history/${reservation_id}`, payload, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error creating Patient History', error);
        }
    }


    return (
        <ReservationContext.Provider
            value={{
                createReservation,
                getReservation,
                updateReservation,
                getPatientHistory,
                createPatientHistory,
                reservations,
                setReservations,
                todayReservations
            }}>
            {children}
        </ReservationContext.Provider>
    )
}

export { ReservationContext, ReservationProvider };