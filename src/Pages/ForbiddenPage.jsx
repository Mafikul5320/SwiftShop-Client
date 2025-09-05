import { Link } from "react-router";

const ForbiddenPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="max-w-xl text-center">
                {/* Big Icon */}
                <div className="text-red-600 mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto w-24 h-24"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>

                {/* Main Text */}
                <h1 className="text-6xl font-extrabold text-gray-800 mb-4">403</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">Access Forbidden</h2>
                <p className="text-gray-500 mb-8">
                    Oops! You don’t have permission to access this page. If you think this is a mistake, please contact the administrator.
                </p>

                {/* Button */}
                <Link
                    to="/"
                    className="inline-block px-6 py-3 font-semibold text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 transition-all"
                >
                    Go Back Home
                </Link>

                {/* Optional Illustration */}
                <div className="mt-10">
                    <img
                        src="https://undraw.co/api/illustrations/403-forbidden"
                        alt="Forbidden Illustration"
                        className="mx-auto w-64 md:w-80"
                    />
                </div>
            </div>
        </div>
    );
};

export default ForbiddenPage;
