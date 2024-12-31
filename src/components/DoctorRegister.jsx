import React , {useState,useEffect} from 'react'
import { registerDoctor } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const inp = "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300";

export default function DoctorRegister() {

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

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


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
    const handleSubmit = async (e) => {
        e.preventDefault();
        // validate form fields
        if (!fullName || !email || !phone || !password || !confirmPassword)
            return setError('Please fill all fields');
        // send data to server
        // console.log(fullName, email, phone, password, age, gender);
        setLoading(true);
            try {
                const response = await registerDoctor({
                    full_name: fullName,
                    email,
                    phone,
                    password,
                    age,
                    gender
                });
                console.log("Doctor user regesterd 200", response);
                // store the token in cokies
                const expires = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // 2 days in milliseconds
                document.cookie = `token=${response.token}; expires=${expires.toUTCString()}`;
                // redirect to dashboard
                navigate("/dashboard");
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
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
                        <option value="">Select Gender</option>
                        <option value="female" name="female">Female</option>
                        <option value="male" name="male">Male</option>
                    </select>
                </div>
            </div>
            {error && <p className='text-xs text-red-600'>{error}</p>}
            <button
                type="submit"
                className={`w-full p-2 text-white ${loading || passwordError ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} rounded-md focus:outline-none focus:ring focus:ring-blue-300`}
                disabled={loading || passwordError != ""}
            >
                {loading ? 'Registering...' : 'Register'}
            </button>
        </form>
    )
}
