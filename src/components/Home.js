import PropTypes from "prop-types";
import SearchBar from "./SearchBar";
import RegionFilter from "./RegionFilter";
import CountryList from "./CountryList";
import { Link } from "react-router-dom";

function Home({
  searchQuery,
  setSearchQuery,
  selectedRegion,
  setSelectedRegion,
  user,
  favorites,
  loading,
  error,
  countries,
  toggleFavorite,
}) {
  return (
    <>
      <div className="px-4">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <RegionFilter
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
          />
        </div>
      </div>

      {user && favorites.length > 0 && (
        <div className="px-6 pt-5 pb-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            Your Favorites
            <span className="ml-2 px-2 py-0.5 bg-gray-200 text-gray-800 rounded-md text-xs font-medium">
              {favorites.length}
            </span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {favorites.map((fav) => (
              <Link
                key={fav.cca3}
                to={`/country/${fav.cca3}`}
                className="px-2 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors flex items-center shadow-sm border border-blue-500"
              >
                {fav.name.common} ⭐
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="p-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-3 border-gray-300 border-t-gray-900 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-medium text-sm">
              Loading countries...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-12 px-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-900"
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
            <h3 className="text-base font-semibold text-gray-900 mb-2">
              Something went wrong
            </h3>
            <p className="text-gray-600 max-w-md mx-auto text-sm">{error}</p>
          </div>
        ) : (
          <CountryList
            countries={countries}
            toggleFavorite={toggleFavorite}
            favorites={favorites}
          />
        )}
      </div>
    </>
  );
}

Home.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  selectedRegion: PropTypes.string.isRequired,
  setSelectedRegion: PropTypes.func.isRequired,
  user: PropTypes.object,
  favorites: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  countries: PropTypes.array.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};

export default Home;
