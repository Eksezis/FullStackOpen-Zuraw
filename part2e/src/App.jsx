import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [matchingCountries, setMatchingCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  
  useEffect(() => {
    axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then((response) => {
      setCountries(response.data);
    });
  }, []);

  const SearchChange = (event) => {
    const x = event.target.value.trim();
    setSearch(x);
    setSelectedCountry(null);
  };

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

  const renderCountryInfo = () => {
    if (!selectedCountry) return null;

    return (
      <div>
        <h2>{selectedCountry.name.common}</h2>
        <p><strong>Capital:</strong> {selectedCountry.capital}</p>
        <p><strong>Area:</strong> {selectedCountry.area} km²</p>
        <p><strong>Languages:</strong> {Object.values(selectedCountry.languages).join(', ')}</p>
        <img src={selectedCountry.flags.png} alt={selectedCountry.flags.alt} width="100" />
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
