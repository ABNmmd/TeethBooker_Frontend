import React from 'react'

const doctors = [
    {
        id: 1,
        name: "Dr. Sarah Johnson",
        specialty: "General Dentistry",
        rating: 4.8,
        email: "sarah.johnson@example.com",
        phone: "+1 (555) 123-4567",
        image: "https://i.pravatar.cc/300",
        bio: "Dr. Sarah Johnson has over 15 years of experience in general dentistry. She specializes in preventive care and cosmetic dentistry."
    },
    {
        id: 2,
        name: "Dr. Michael Lee",
        specialty: "Orthodontics",
        rating: 4.9,
        email: "michael.lee@example.com",
        phone: "+1 (555) 987-6543",
        image: "https://i.pravatar.cc/300",
        bio: "Dr. Michael Lee is a board-certified orthodontist with expertise in traditional braces and Invisalign treatments."
    },
    {
        id: 3,
        name: "Dr. Emily Chen",
        specialty: "Pediatric Dentistry",
        rating: 4.7,
        email: "emily.chen@example.com",
        phone: "+1 (555) 246-8135",
        image: "https://i.pravatar.cc/300",
        bio: "Dr. Emily Chen specializes in pediatric dentistry, creating a fun and comfortable environment for children's dental care."
    },
]

function DoctorsListing() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Our Doctors</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doctor) => (
                    <div key={doctor.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="relative h-48">
                            <img
                                src={doctor.image}
                                alt={doctor.name}
                                className='w-full h-full object-cover'
                            />
                        </div>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{doctor.name}</h2>
                            <p className="text-sm text-gray-600 mb-2">{doctor.specialty}</p>
                            <div className="flex items-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="text-sm text-gray-600">{doctor.rating}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                <span className="text-sm text-gray-600">{doctor.email}</span>
                            </div>
                            <div className="flex items-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                <span className="text-sm text-gray-600">{doctor.phone}</span>
                            </div>
                            <p className="text-sm text-gray-700">{doctor.bio}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DoctorsListing;