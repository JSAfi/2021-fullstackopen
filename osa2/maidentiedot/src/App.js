import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({city}) => {
  const [weather, setWeather] = useState([])

  const api_key = process.env.REACT_APP_API_KEY

  console.log(`https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}`)

  useEffect(() => {
    axios
      .get(`https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [])

  console.log(api_key)
  console.log(weather)

  if(weather.length !== 0){
    return (
    <div>
      <h3>{weather.current.condition.text}</h3>
      <img src={weather.current.condition.icon} alt="" width="100"/>
    </div>
    )
  } else {

    return(
      <div></div>
    )
  }
}

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
        <h2>
          Weather in {country.capital}
        </h2>
        <div>
          <Weather city = {country.capital} />
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
    console.log('country effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response =>{
        console.log('countrydata promise fulfilled')
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
