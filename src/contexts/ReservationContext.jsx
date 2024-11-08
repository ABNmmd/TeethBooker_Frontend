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

    <ReservationContext.Provider
        value={{
            createReservation,
            getReservation,
            updateReservation,
            getReservationHistory,
            createReservationHistory
        }}>
        {children}
    </ReservationContext.Provider>
}

export { ReservationContext, ReservationProvider };