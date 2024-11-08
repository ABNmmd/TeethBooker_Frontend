import { createContext } from "react";
import api from "../services/api";


const ReservationContext = createContext();

const ReservationProvider = ({ children }) => {

    // create reservation
    const createReservation = async (data) => {
        try {
            const response = await api.post('/reservation', data);
            return response.data;
        } catch (error) {
            console.error('Error creating Reservation', error);
        }
    }

    // get reservation
    const getReservation = async () => {
        try {
            const response = await api.get(`/reservation`);
            return response.data;
        } catch (error) {
            console.error('Error getting Reservation', error);
        }
    }

    // update reservation
    const updateReservation = async (reservationId, data) => {
        try {
            const response = await api.put(`/reservation/${reservationId}`, data);
            return response.data;
        } catch (error) {
            console.error('Error updating Reservation', error);
        }
    }

    // get patient history
    const getPatientHistory = async (patientId) => {
        try {
            const response = await api.get(`/reservation_history/`);
            return response.data;
        } catch (error) {
            console.error('Error getting Patient History', error);
        }
    }

    <ReservationContext.Provider
        value={{
            createReservation,
            getReservation,
            updateReservation,
            getPatientHistory,
            createPatientHistory
        }}>
        {children}
    </ReservationContext.Provider>
}

export { ReservationContext, ReservationProvider };