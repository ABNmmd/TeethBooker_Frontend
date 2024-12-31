import { useState,createContext, useEffect } from "react";
import api from "../services/api";


const DoctorContext = createContext();

const DoctorProvider = ({ children }) => {
    const [doctor, setDoctor] = useState({});
    // get doctor data
    const getDoctor = async (id) => {
        try {
            const doctorData = await api.get(`/doctor/${id}`);
            return doctorData;
        } catch (error) {
            console.error('Error fetching the doctor data ', error);
        }
    }

    // update doctor data
    const updateDoctor = async (id, newPatientData) => {
        try {
            const response = await api.put(`/doctor/${id}`, newPatientData);
            return response;
        } catch (error) {
            console.error('Error updating the doctor ', error);
        }
    }

    // delete the doctor
    const deleteDoctor = async (id) => {
        try {
            const response = await api.delete(`/doctor/${id}`);
            return response;
        } catch (error) {
            console.error('Error deleting the doctor ', error);
        }
    }

    // modify this later
    useEffect(() => {
        
    }, []);

    return (
        <DoctorProvider.Provider value={{ doctor, setDoctor, getDoctor, updateDoctor, deleteDoctor }}>
            {children}
        </DoctorProvider.Provider>
    );
}

export {DoctorContext, DoctorProvider};