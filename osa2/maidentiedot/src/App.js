import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CountryTitle = ({country}) => {
  return (
    <li>
      {country.name}
    </li>
  )
}

const Country = ({country}) => {
  return (
    <div>
      <h1>
        {country.name}
      </h1>
      <div>
        capital {country.capital}
      </div>
      <div>
        population {country.population}
      </div>
      <div>
        <h2>
          languages
        </h2>          
          {country.languages.map((item) =>
            <li key={item.name}>
              {item.name}
            </li>
          )}
      </div>
      <div>
        <img src={country.flag} width="500" height="600"/>
      </div>
    </div>
  )
}

const Countries = ({countries}) => {
  console.log(countries.length)
  if(countries.length > 10) {
    return (
      "Too many matches, specify another filter"
    )
  } 
  if(countries.length <= 10 && countries.length > 1) {
    return( 
      countries.map((item) =>
        <CountryTitle country={item} key = {item.name} />
      )
    )
  }
  return(
    countries.map((item) =>
        <Country country={item} key = {item.name} />
      )
  )
}

const FilterBox = ({filter, onChange}) => {
  return (
    <div>
      find countries: <input value={filter} onChange = {onChange} />
    </div>
  )
}

const App = () =>{
  const [allCountries, setAllCountries] = useState([])
  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response =>{
        console.log('promise fulfilled')
        console.log(response.data)
        setAllCountries(response.data)
      })
  }, [])

  const filteredCountries = allCountries.filter((item) => item.name.toUpperCase().search(filter.toUpperCase()) > -1)

  return(
    <div>
      <FilterBox filter = {filter} onChange = {handleFilterChange} />
      <Countries countries={filteredCountries} />
    </div>
  )
}

export default App;
