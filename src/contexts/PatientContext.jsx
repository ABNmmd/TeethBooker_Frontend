import { useState,createContext, useEffect } from "react";
import api from "../services/api";


const PatientContext = createContext();

const PatientProvider = ({ children }) => {
    const [patient, setPatient] = useState({}); // save patient data

    // to get patient data
    const getPatient = async (id) => {
        try {
            const patientData = await api.get(`/patient/${id}`);
            return patientData;
        } catch (error) {
            console.error('Error fetching the patient data ', error);
        }
    }

    // to update patient data
    const updatePatient = async (id, newPatientData) => {
        try {
            const response = await api.put(`/patient/${id}`, newPatientData);
            return response;
        } catch (error) {
            console.error('Error updatting the patient ', error);
        }
    }

    // to delet the patient
    const deletePatient = async (id) => {
        try {
            const response = await api.delete(`/patient/${id}`);
            return response;
        } catch (error) {
            console.error('Error deleting the patient ', error);
        }
    }

    // modify this later
    useEffect(() => {
        
    }, []);

    return (
        <PatientContext.Provider value={{ patient, setPatient, getPatient, updatePatient, deletePatient }}>
            {children}
        </PatientContext.Provider>
    );
}

export {PatientContext, PatientProvider};