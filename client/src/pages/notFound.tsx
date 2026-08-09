import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="flex flex-col justify-center items-center w-full px-4">
        {/* Main Content */}
        <div className="text-center max-w-2xl">
          {/* 404 Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
              <AlertCircle
                className="relative w-32 h-32 text-blue-600"
                strokeWidth={1}
              />
            </div>
          </div>

          {/* 404 Text */}
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-4">
            404
          </h1>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            Oops! It seems the page you're looking for doesn't exist. It might
            have been moved or deleted.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/home")}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              <Home size={20} />
              Return to Home
            </button>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Go Back
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-12 pt-8 border-t border-gray-300">
            <p className="text-gray-600 text-sm mb-4">Need help?</p>
            <p className="text-gray-500">
              Contact support at{" "}
              <a
                href="mailto:support@systemos.com"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                support@systemos.com
              </a>
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
      </div>
    </div>
  );
};

export default NotFoundPage;
