import React from 'react';

const NotFound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold">404</h1>
                <p className="mt-4 text-lg">Page Not Found</p>
                <a href="/" className="mt-4 text-blue-600 hover:underline">Go to Home</a>
            </div>
        </div>
    );
};

export default NotFound;