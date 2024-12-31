import React, { useState } from 'react'
import PatientRegister from '../components/PatientRegister'
import DoctorRegister from '../components/DoctorRegister';

export default function Register() {

  const [isClicked, setClicked] = useState("");
  console.log(isClicked);
  
  return (
    isClicked == "" ? (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 space-x-24">
        <div className='border cursor-pointer border-blue-600 rounded-2xl text-blue-600 font-bold hover:bg-blue-600 hover:text-white px-12 py-8' onClick={() => setClicked("Patient")}>Patient</div>     
        <div className='border cursor-pointer border-blue-600 rounded-2xl text-blue-600 font-bold hover:bg-blue-600 hover:text-white px-12 py-8' onClick={() => setClicked("Doctor")}>Doctor</div>     
      </div>
    ) : isClicked == "Patient" ? ( 
      <div className="flex items-center justify-center min-h-screen bg-gray-100 space-x-24">
        <PatientRegister />
      </div>
    ) : (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 space-x-24">
        <DoctorRegister />
    </div>)

  )
}
