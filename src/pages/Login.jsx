import React, { useState } from 'react';
import { login } from '../services/auth'
import { useNavigate } from 'react-router-dom';
import { CiMail, CiRead, CiUnread } from "react-icons/ci";

const inputStyl = "w-full p-2 border border-gray-300 rounded-md focus:outline-none";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isSafe, setIsSafe] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // validate data
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }
        
        if (password && password.length < 8) {
            return setError("Password must be at least 8 characters");
        }

        try {
            // API call to login
            const response = await login({ email, password });
            console.log(response);
            const expires = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // 2 days in milliseconds
            document.cookie = `token=${response.token}; expires=${expires.toUTCString()};`;
            navigate("/dashboard");
        } catch (error) {
            console.log(error.message);
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className='relative'>
                        <input
                            type="email"
                            value={email}
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={inputStyl}
                        />
                        <CiMail className="absolute right-3 top-3 text-gray-400" />
                    </div>
                    <div className='relative'>
                        <input
                            type="password"
                            value={password}
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={inputStyl}
                        />
                        { isSafe
                        ?<CiUnread className="absolute right-3 top-3 text-gray-400 cursor-pointer" onClick={() => setIsSafe(!isSafe)} />
                        :<CiRead className="absolute right-3 top-3 text-gray-400 cursor-pointer" onClick={() => setIsSafe(!isSafe)} /> }
                    </div>
                    {error && <p className='text-xs text-red-600 capitalize'>{error}</p>}
                    <button
                        type="submit"
                        className="w-full p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Login
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600">
                    Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
                </p>
            </div>
        </div>
    );
}

export default Login;