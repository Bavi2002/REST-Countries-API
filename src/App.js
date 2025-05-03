import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import {
  getAllCountries,
  getCountryByName,
  getCountriesByRegion,
} from "./services/api";
import { saveFavorites, getFavorites } from "./services/favorites";
import Header from "./components/Header";
import Home from "./components/Home";
import CountryDetails from "./components/CountryDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/Footer";
import { useNavigate } from "react-router-dom";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userFavorites = await getFavorites(currentUser.uid);
        setFavorites(userFavorites);
      } else {
        setFavorites([]);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        let data;
        if (searchQuery) {
          data = await getCountryByName(searchQuery);
        } else if (selectedRegion) {
          data = await getCountriesByRegion(selectedRegion);
        } else {
          data = await getAllCountries();
        }
        setCountries(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchCountries();
  }, [searchQuery, selectedRegion]);

  useEffect(() => {
    if (user) {
      saveFavorites(user.uid, favorites);
    }
  }, [favorites, user]);

  const toggleFavorite = (country) => {
    if (!user) {
      alert("Please log in to save favorites.");
      navigate("/login");
      return;
    }
    setFavorites((prev) => {
      if (prev.some((fav) => fav.cca3 === country.cca3)) {
        return prev.filter((fav) => fav.cca3 !== country.cca3);
      }
      return [...prev, country];
    });
  };

  return (
    <div className="font-serif">
      <Header user={user} />
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedRegion={selectedRegion}
                setSelectedRegion={setSelectedRegion}
                user={user}
                favorites={favorites}
                loading={loading}
                error={error}
                countries={countries}
                toggleFavorite={toggleFavorite}
              />
            }
          />
          <Route
            path="/country/:code"
            element={
              <CountryDetails
                toggleFavorite={toggleFavorite}
                favorites={favorites}
              />
            }
          />
          <Route
            path="/login"
            element={
              <div className="p-6">
                <Login setError={setError} />
              </div>
            }
          />
          <Route
            path="/register"
            element={
              <div className="p-6">
                <Register setError={setError} />
              </div>
            }
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
