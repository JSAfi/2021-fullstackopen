import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Country = ({country}) => {
  return (
    <li>
      {country.name}
    </li>
  )
}

const Countries = ({countries}) => {
  return (
    countries.map((item) =>
      <Country country = {item} key = {item.name}/>
    )
  )
}

const App = () =>{
  const [allCountries, setAllCountries] = useState([])

  const filter = 'land'

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

  console.log(filteredCountries)

  return(
    <div>
      <h1>
        Hello world!
      </h1>
      <p>
        <Countries countries={filteredCountries} />
      </p>
    </div>
  )
}

export default App;
