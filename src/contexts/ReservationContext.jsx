import { createContext } from "react";
import api from "../services/api";


const ReservationContext = createContext();

const ReservationProvider = ({ children }) => {

    <ReservationContext.Provider value={{  }}>
        {children}
    </ReservationContext.Provider>
}

export { ReservationContext, ReservationProvider };