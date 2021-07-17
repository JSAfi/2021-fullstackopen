import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Countries = ({countries, filter, handleClick}) => {
  console.log(countries.length)
  if(countries.length > 10) {
    return (
      "Too many matches, specify another filter"
    )
  }
  if(countries.length > 1) {
    return(
      countries.map((item) => 
        <div key={item.name}>
          {item.name}
          <button onClick= {() => handleClick(item)}>
              Show
          </button>
        </div>
      )
    )
  }
  return (
    countries.map((country) => 
      <div key={country.name}>
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
          <img src={country.flag} width="500" alt="lipun kuva"/>
        </div>
      </div>
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

  const handleClick = (props) => {
    console.log(props)
    setFilter(props.name)
    console.log(filter)
  }

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
      <Countries countries={filteredCountries} filter={filter} handleClick={handleClick}/>
    </div>
  )
}

export default App;
