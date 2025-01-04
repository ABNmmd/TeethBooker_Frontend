import { useState,createContext, useEffect,useContext } from "react";
import api from "../services/api";
import { MainContext } from "./MainContext";


const PatientContext = createContext();

const PatientProvider = ({ children }) => {
    const {user} = useContext(MainContext);
    const {token} = useContext(MainContext);
    const [patient, setPatient] = useState({}); // save patient data

    // to get patient data
    const getPatient = async (id) => {
        try {
            const patientData = await api.get(`/patient/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            return patientData;
        } catch (error) {
            console.error('Error fetching the patient data ', error);
        }
    }

    // to update patient data
    const updatePatient = async (id, newPatientData) => {
        try {
            const response = await api.put(`/patient/${id}`, newPatientData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            return response;
        } catch (error) {
            console.error('Error updatting the patient ', error);
        }
    }

    // to delet the patient
    const deletePatient = async (id) => {
        try {
            const response = await api.delete(`/patient/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            return response;
        } catch (error) {
            console.error('Error deleting the patient ', error);
        }
    }

    useEffect(() => {
        if(user?.role == "patient"){
            setPatient(getPatient(user?.id));
        }
    }, [user]);

    return (
        <PatientContext.Provider value={{getPatient, updatePatient, deletePatient }}>
            {children}
        </PatientContext.Provider>
    );
}

export {PatientContext, PatientProvider};