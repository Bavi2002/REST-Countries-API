import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function CountryList({ countries, toggleFavorite, favorites }) {
  const navigate = useNavigate();

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8">
      {countries.map((country) => (
        <li
          key={country.cca3}
          className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
        >
          <div
            className="relative cursor-pointer"
            onClick={() => navigate(`/country/${country.cca3}`)}
          >
            <div className="relative h-40 sm:h-48 w-full overflow-hidden">
              <img
                src={country.flags.png}
                alt={`${country.name.common} flag`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent"></div>
            </div>
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full shadow-sm flex items-center">
              <span className="text-xs font-medium text-gray-700">
                {country.region}
              </span>
            </div>
          </div>

          <div className="p-4 sm:p-5">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 truncate">
              {country.name.common}
            </h2>

            <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
              <div className="flex items-center text-gray-600">
                <svg
                  className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="text-xs sm:text-sm">
                  {country.population.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center text-gray-600">
                <svg
                  className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-xs sm:text-sm">{country.region}</span>
              </div>

              <div className="flex items-center text-gray-600">
                <svg
                  className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <span className="text-xs sm:text-sm">
                  {country.capital?.[0] || "N/A"}
                </span>
              </div>
            </div>

            <div className="flex justify-between space-x-2 sm:space-x-3">
              <button
                id={`favorite-button-${country.cca3}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(country);
                }}
                className={`flex-1 flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all text-xs sm:text-sm ${
                  favorites.some((fav) => fav.cca3 === country.cca3)
                    ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md hover:shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <svg
                  className={`w-4 sm:w-5 h-4 sm:h-5 mr-1 sm:mr-2 ${
                    favorites.some((fav) => fav.cca3 === country.cca3)
                      ? "text-white"
                      : "text-gray-500"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {favorites.some((fav) => fav.cca3 === country.cca3)
                  ? "Remove"
                  : "Favorite"}
              </button>

              <button
                id={`details-button-${country.cca3}`}
                onClick={() => navigate(`/country/${country.cca3}`)}
                className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center text-xs sm:text-sm"
              >
                <svg
                  className="w-4 sm:w-5 h-4 sm:h-5 mr-1 sm:mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Details
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

CountryList.propTypes = {
  countries: PropTypes.array.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  favorites: PropTypes.array.isRequired,
};

export default CountryList;