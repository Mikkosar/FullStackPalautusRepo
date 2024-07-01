import CountryInput from './components/CountryInput';
import FilteredCountries from './components/FilteredCountries';
import CountriesServices from './services/Countries';

import { useState, useEffect } from 'react'

function App() {
  const [userInput, setUserInput] = useState('');
  const [countries, setCountries] = useState([]);
  const [wantedCountries, setWantedCountries] = useState([]);

  useEffect(() => {
    CountriesServices
      .getCountiries()
      .then(data => {
        setCountries(data),
        filterCountriesByInput()
      })
  }, [userInput]);

  const filterCountriesByInput = () => {
    setWantedCountries(countries.filter(c => c.name.common.toLowerCase().includes(userInput.toLowerCase())))
  };

  return (
    <>
      <CountryInput userInput={userInput} setUserInput={setUserInput}/>
      <FilteredCountries wantedCountries={wantedCountries} setWantedCountries={setWantedCountries} />
    </>
  )
}

export default App
