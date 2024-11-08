import { createContext } from "react";
import api from "../services/api";


const PatientContext = createContext();

const PatientProvider = ({ children }) => {
    const [patient, setPatient] = useState({});

    const getPatient = async (id) => {
        try {
            const patientData = await api.get(`/patient/${id}`);
            return patientData;
        } catch (error) {
            console.error('Error fetching the patient data ', error);
        }
    }

    const 
}