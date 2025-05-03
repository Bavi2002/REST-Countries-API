import PropTypes from "prop-types";

function RegionFilter({ selectedRegion, setSelectedRegion }) {
  const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

  return (
    <div className="mb-8 relative w-full max-w-xs">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <select
        id="region"
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}
        className="block w-full pl-10 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-xl shadow-sm appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjYgOSAxMiAxNSAxOCA5Ij48L3BvbHlsaW5lPjwvc3ZnPg==')] bg-no-repeat bg-[right_0.75rem_center] hover:shadow-md transition-all duration-200"
      >
        {regions.map((region) => (
          <option
            key={region}
            value={region === "All" ? "" : region}
            className="text-gray-900"
          >
            {region === "" ? "All Regions" : region}
          </option>
        ))}
      </select>
    </div>
  );
}

RegionFilter.propTypes = {
  selectedRegion: PropTypes.string.isRequired,
  setSelectedRegion: PropTypes.func.isRequired,
};

export default RegionFilter;
