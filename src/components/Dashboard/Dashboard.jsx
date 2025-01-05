import React, { useContext, useEffect } from 'react'
import { MainContext } from '../../contexts/MainContext'
import PatientDashboard from './Patient Dashboard/PatientDashboard';
import DoctorDashboard from './Doctor Dashboard/DoctorDashboard';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const {user,token} = useContext(MainContext);

    const navigate = useNavigate();    

    useEffect(() => {
        if (!token || !user) {
            navigate("/login");
        }
    }, [token,user]); 


    if (user?.role === 'patient') {
        return <PatientDashboard />;
    } else if (user?.role === 'doctor') {
        return <DoctorDashboard />;
    } else {
        return <div>Loading ....</div>;
    }
      
}
