import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import PropTypes from "prop-types";
import { auth } from "../firebase";

function Header({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 p-4 sm:p-6 bg-white rounded-xl shadow-sm border border-gray-100 w-full mx-auto">
      <div className="flex items-center mb-4 md:mb-0">
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 mr-2 sm:mr-3"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9 9 9 0 0 1 9 9z" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
          Country Explorer
        </h1>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        {user ? (
          <>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 flex items-center justify-center shadow-sm">
                <span className="text-white font-medium text-xs sm:text-sm">
                  {user.email.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-gray-600 font-medium hidden sm:inline text-sm sm:text-base">
                {user.email}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:shadow-md transition-all duration-300 hover:from-red-600 hover:to-pink-600 text-xs sm:text-sm font-medium flex items-center"
            >
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
            id="login-button"
              to="/login"
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-indigo-600 hover:text-indigo-700 bg-white hover:bg-indigo-50 rounded-lg transition-colors text-xs sm:text-sm font-medium border border-indigo-100 flex items-center"
            >
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Login
            </Link>
            <Link
            id="register-button"
              to="/register"
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg hover:shadow-md transition-all duration-300 hover:from-indigo-700 hover:to-blue-600 text-xs sm:text-sm font-medium flex items-center"
            >
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

Header.propTypes = {
  user: PropTypes.object,
};

export default Header;
