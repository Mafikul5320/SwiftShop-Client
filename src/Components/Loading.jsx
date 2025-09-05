import React from 'react';

const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center">
                <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-indigo-600 border-gray-200"></div>
                <p className="mt-4 text-gray-600 font-medium">Loading...</p>
            </div>
        </div>
    );
};

export default Loading;