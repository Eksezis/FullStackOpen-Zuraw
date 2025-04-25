import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [matchingCountries, setMatchingCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  
  // Api key from https://openweathermap.org
  const weatherApiKey = '0962c74ed92a5e11cdfe4fbd879f9cde';

  //Fills countries list with ALL countries
  useEffect(() => {
    axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then((response) => {
      setCountries(response.data);
    });
  }, []);

  //sets matching countries to the countries with include inputed text "It works this time <3 ^o^ "
  useEffect(() => {
    if (search === '') {
      setMatchingCountries([]);
    } else {
      const filtered = countries.filter(country =>
        country.name.common && country.name.common.toLowerCase().includes(search.toLowerCase())
      );
      setMatchingCountries(filtered);
    }
  }, [search, countries]);

  //gets weather for the capital of selected country
  useEffect(() => {
    if (selectedCountry && selectedCountry.capital && selectedCountry.capital[0]) {
      const capital = selectedCountry.capital[0];
  
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${weatherApiKey}`)
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => {
          console.error("Error fetching weather:", error);
          setWeather(null);
        });
    }
  }, [selectedCountry]);

  //sets search variable upon input change
  const SearchChange = (event) => {
    const x = event.target.value.trim();
    setSearch(x);
    setSelectedCountry(null);
  };

  //checks with countries it should show and give back a list or sets a single one if its the only one
  const Operation = () => {
    if (matchingCountries.length === 0) { return null; }
    if (matchingCountries.length > 10) { return <p>Too many matches, specify another filter</p>; }
    if (selectedCountry === null) {
      if (matchingCountries.length > 1) {
        return (
          <div>
            {matchingCountries.map((country) => (
              <div key={country.name.common}>
                <p>{country.name.common}</p>
                <button onClick={() => setSelectedCountry(country)}>Show Info</button>
              </div>
            ))}
          </div>
        );
      }
      if (matchingCountries.length === 1) {
        setSelectedCountry(matchingCountries[0]);
      }
    }
  };

  // gives the information of a selected counry
  const renderCountryInfo = () => {
    if (!selectedCountry) return null;

    return (
      <div>
        <h2>{selectedCountry.name.common}</h2>
        <p><strong>Capital:</strong> {selectedCountry.capital}</p>
        <p><strong>Area:</strong> {selectedCountry.area} km²</p>
        <p><strong>Languages:</strong> {Object.values(selectedCountry.languages).join(', ')}</p>
        <img src={selectedCountry.flags.png} alt={selectedCountry.flags.alt} width="100" />
        {selectedCountry.capital && selectedCountry.capital[0] && weather ? (
          <div>
            <p><strong>Temperature:</strong> {weather.main.temp}°F</p>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p><strong>Wind:</strong> {weather.wind.speed} m/s</p>
          </div>
        ) : (
          <p>Weather data not available</p>
        )}
      </div>
    );
  };

  return (
    <div>
      find countries: <input value={search} onChange={SearchChange} />
      <Operation />
      {renderCountryInfo()}
    </div>
  );
}

export default App;
