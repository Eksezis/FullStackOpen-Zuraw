import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('')
  const [matchingCountries, setMatchingCountries] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  
  useEffect(() => {
    axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then((response) => {
      setCountries(response.data);
    })
    },[]
  )

  const SearchChange = (event) => {
    console.log(event.target.value.trim());
    setSearch(event.target.value.trim());
    Filter();

  }

  const Filter = () => {
    setMatchingCountries(countries.filter(country => 
      country.name.common && country.name.common.toLowerCase().includes(search.toLowerCase())
    ).map(country => [
      country.name.common, 
      country.capital, 
      country.area, 
      country.languages, 
      country.flags.png, 
      country.flags.alt
    ]));
    
  }

  const Operation = () => {
    if (matchingCountries.length === 0) { return null; }
    if (matchingCountries.length > 10) { return <p>Too many matches, specify another filter</p>; }
    return (
      <div>
        {matchingCountries.map((item, index) => (
          <div key={item[0]}>
            <p>{item[0]}</p>
            <button onClick={() => setSelectedIndex(index)}>Show Info</button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      find countries: <input value={search} onChange={SearchChange} />
      -- {search}
      <Operation/>
    </div>
  )
}

export default App
