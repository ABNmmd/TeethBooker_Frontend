import React, { useContext, useEffect, useState } from 'react'
import { MainContext } from '../../contexts/MainContext';
import { DoctorContext } from '../../contexts/DoctorContext';

function Settings() {

    const [isLoading, setIsLoading] = useState(false);

    const {user,setUser} = useContext(MainContext); // infos of authentified user
    const {getDoctor,updateDoctor} = useContext(DoctorContext); // the function that get doctor infos from the DoctorContext

    // you should also add the function that get patient infos from the PatientContext

    const [doctor, setDoctor] = useState({}); // authentified doctor
    
    // you should also get the authentified patient to add it to settings


    // you should also get infos of the authentified patient to add it to settings

    const [personalInfo, setPersonalInfo] = useState({});



    // more info about doctor
    useEffect(() => {
        if(user?.role == "doctor"){
            const fetchDoctorData = async () => {
                    const doctorData = await getDoctor(user?.id);
                    setUser(doctorData.user);
                    setDoctor(doctorData.doctor);
                    setIsLoading(true);
            };
    
            fetchDoctorData();
        }
    }, [user?.id]);    

    useEffect(() => {
        if (doctor) {
            const newDoctorInfo = {
                adress: doctor?.adress || "",
                years_experience: doctor?.years_experience || "",
                education: doctor?.education || "",
            };   

            if (user?.role === "doctor") {
                setPersonalInfo({
                    full_name: user?.full_name || "",
                    email: user?.email || "",
                    phone: user?.phone|| "",
                    ...newDoctorInfo
                });
                
            }

            
        }
    }, [doctor]);    



    const handleSubmit = (e) => {
        e.preventDefault()
        
        const updateData = async () => {
            setIsLoading(false);  // set loading state to true before making the update request
    
            try {
                const updatedDoctorData = await updateDoctor(user?.id, personalInfo);
            } catch (error) {
                console.error("Error updating doctor data: ", error);
            } finally {
                setIsLoading(true); // reset loading state
            }
        };
    
        updateData();
    }  


    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Account Settings</h1>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                {
                    isLoading ? (
                
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className='space-y-2'>
                                    <div className='space-y-2'>
                                        <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">Full name</label>
                                        <input
                                            type="text"
                                            id="full_name"
                                            name="full_name"
                                            value={personalInfo.full_name || ""}
                                            onChange={(e) => setPersonalInfo({ ...personalInfo, full_name: e.target.value })}
                                            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <div className='space-y-2'>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                        <input
                                        disabled
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={personalInfo.email || ""}
                                            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <div className='space-y-2'>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={personalInfo.phone || ""}
                                            onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                                            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                    </div>
                                </div>

                                {/*if the user authentified is a doctor , show the doctor's information*/}
                                <div className={`${user?.role === 'doctor' ? 'block' : 'hidden'} space-y-2`}>
                                    <div className='space-y-2'>
                                        <label htmlFor="adress" className="block text-sm font-medium text-gray-700">Adress</label>
                                        <input
                                            type="text"
                                            id="adress"
                                            name="adress"
                                            value={personalInfo.adress || ""}
                                            onChange={(e) => setPersonalInfo({ ...personalInfo, adress: e.target.value })}
                                            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className='space-y-2'>
                                        <label htmlFor="years_experience" className="block text-sm font-medium text-gray-700">Years of experience</label>
                                        <input
                                            type="text"
                                            id="years_experience"
                                            name="years_experience"
                                            value={personalInfo.years_experience || ""}
                                            onChange={(e) => setPersonalInfo({ ...personalInfo, years_experience: e.target.value })}
                                            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className='space-y-2'>
                                        <label htmlFor="education" className="block text-sm font-medium text-gray-700">Education</label>
                                        <input
                                            type="text"
                                            id="education"
                                            name="education"
                                            value={personalInfo.education || ""}
                                            onChange={(e) => setPersonalInfo({ ...personalInfo, education: e.target.value })}
                                            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                            </div>
                            

                            
                            <div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                        
                    ):(<div>Loading ....</div>)
                }
            </div>
        </div>
    )
}

export default Settings;