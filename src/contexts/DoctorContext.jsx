import { useState,createContext, useEffect, useContext } from "react";
import api from "../services/api";
import { MainContext } from "./MainContext";


const DoctorContext = createContext();

const DoctorProvider = ({ children }) => {
    const {user} = useContext(MainContext);
    const {token} = useContext(MainContext);
    const [doctor, setDoctor] = useState({}); // authentified doctor data
    const [targetDoctor, setTargetDoctor] = useState({});  // target doctor
    // get doctor data
    const getDoctor = async (id) => {
        try {
            const doctorData = await api.get(`/doctor/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            return doctorData.data;
        } catch (error) {
            console.error('Error fetching the doctor data ', error);
        }
    }

    // update doctor data
    const updateDoctor = async (id, newDoctorData) => {
        try {
            const response = await api.put(`/doctor/${id}`, newDoctorData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; HttpOnly; SameSite=Strict`;
            return response;
        } catch (error) {
            console.error('Error updating the doctor ', error);
        }
    }

    // delete the doctor
    const deleteDoctor = async (id) => {
        try {
            const response = await api.delete(`/doctor/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            return response;
        } catch (error) {
            console.error('Error deleting the doctor ', error);
        }
    }

    

    return (
        <DoctorContext.Provider value={{getDoctor, updateDoctor, deleteDoctor ,doctor}}>
            {children}
        </DoctorContext.Provider>
    );
}

export {DoctorContext, DoctorProvider};