import React, { useEffect, useState } from 'react'


const inp = "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300";

function PatientRegister() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');

    // password error
    const [passwordError, setPasswordError] = useState("");
    const [error, setError] = useState("");


    useEffect(() => {
        // handle password live validation
        const handlePassword = () => {
            setPasswordError("");
            if (password && password.length < 8) {
                setPasswordError("Password must be at least 8 characters");
            } else if (confirmPassword && password !== confirmPassword) {
                setPasswordError("Passwords do not match");
            } else {
                setPasswordError("");
            }
        }
        handlePassword();
    }, [confirmPassword]);

    // handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        // validate form fields
        if (!fullName || !email || !phone || !password || !confirmPassword)
            return setError('Please fill all fields');
        if (password !== confirmPassword)
            return setError('Passwords do not match');
        // send data to server
        console.log(fullName, email, phone, password, age, gender);
        alert('Registration successful');
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <input
                    type="text"
                    placeholder='Full Name'
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className={`${inp}`}
                />
            </div>
            <div>
                <input
                    type="tel"
                    placeholder='Phone Number'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className={`${inp}`}
                />
            </div>
            <div>
                <input
                    type="email"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={`${inp}`}
                />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
                <div>
                    <input
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={`${inp}`}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className={`${inp}`}
                    />
                </div>
            </div>
            {passwordError && <p className='text-xs text-red-600'>{passwordError}</p>}
            <div className="flex flex-col sm:flex-row gap-2">
                <div className='flex-grow'>
                    <input
                        type="number"
                        placeholder='Age'
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                        className={`${inp}`}
                    />
                </div>
                <div className='flex-grow'>
                    <select
                        value={gender}
                        name='gender'
                        onChange={(e) => setGender(e.target.value)}
                        className={`${inp}`}
                    >
                        <option value="female" name="female">Female</option>
                        <option value="male" name="male">Male</option>
                    </select>
                </div>
            </div>
            <button
                type="submit"
                className="w-full p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
                Register
            </button>
        </form>
    )
}

export default PatientRegister