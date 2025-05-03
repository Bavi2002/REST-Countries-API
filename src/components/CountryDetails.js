import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { getCountryByCode } from "../services/api";

function CountryDetails({ toggleFavorite, favorites }) {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      setLoading(true);
      try {
        const data = await getCountryByCode(code);
        setCountry(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchCountry();
  }, [code]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 sm:mb-8 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center text-sm sm:text-base"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Countries
      </button>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 relative overflow-hidden">
            <img
              src={country.flags.png}
              alt={`${country.name.common} flag`}
              className="w-full h-64 sm:h-80 lg:h-full object-cover lg:min-h-[350px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
          </div>

          <div className="lg:w-1/2 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-0">
                {country.name.common}
              </h2>
              <button
                onClick={() => toggleFavorite(country)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl flex items-center transition-all text-sm sm:text-base ${
                  favorites.some((fav) => fav.cca3 === country.cca3)
                    ? "bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 ${
                    favorites.some((fav) => fav.cca3 === country.cca3)
                      ? "text-white"
                      : "text-gray-500"
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {favorites.some((fav) => fav.cca3 === country.cca3)
                  ? "Saved"
                  : "Save"}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center">
                  <svg
                    className="w-4 sm:w-5 h-4 sm:h-5 mr-2 sm:mr-3 text-indigo-500"
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
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Population
                    </p>
                    <p className="font-medium text-sm sm:text-base">
                      {country.population.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <svg
                    className="w-4 sm:w-5 h-4 sm:h-5 mr-2 sm:mr-3 text-indigo-500"
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
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Region</p>
                    <p className="font-medium text-sm sm:text-base">
                      {country.region}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <svg
                    className="w-4 sm:w-5 h-4 sm:h-5 mr-2 sm:mr-3 text-indigo-500"
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
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Capital</p>
                    <p className="font-medium text-sm sm:text-base">
                      {country.capital?.[0] || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center">
                  <svg
                    className="w-4 sm:w-5 h-4 sm:h-5 mr-2 sm:mr-3 text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                    />
                  </svg>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Languages
                    </p>
                    <p className="font-medium text-sm sm:text-base">
                      {Object.values(country.languages || {}).join(", ") ||
                        "N/A"}
                    </p>
                  </div>
                </div>

                {country.currencies && (
                  <div className="flex items-center">
                    <svg
                      className="w-4 sm:w-5 h-4 sm:h-5 mr-2 sm:mr-3 text-indigo-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Currency
                      </p>
                      <p className="font-medium text-sm sm:text-base">
                        {Object.values(country.currencies)
                          .map((c) => `${c.name} (${c.symbol})`)
                          .join(", ")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {country.borders && country.borders.length > 0 && (
              <div className="pt-4 sm:pt-6 border-t border-gray-200">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
                  Border Countries
                </h3>
                <div className="flex flex-wrap gap-2">
                  {country.borders.map((border) => (
                    <button
                      key={border}
                      onClick={() => navigate(`/country/${border}`)}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs sm:text-sm font-medium transition-colors"
                    >
                      {border}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

CountryDetails.propTypes = {
  toggleFavorite: PropTypes.func.isRequired,
  favorites: PropTypes.array.isRequired,
};

export default CountryDetails;
