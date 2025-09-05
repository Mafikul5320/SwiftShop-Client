import { Link } from "react-router";
import { AlertTriangle } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-6 rounded-full">
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
        </div>

        {/* Error Text */}
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-700">
          Oops! Page not found
        </h2>
        <p className="mt-2 text-gray-500">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Back Button */}
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-[#08aec3] text-white rounded-lg shadow hover:bg-[#0797aa] transition"
        >
           Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
