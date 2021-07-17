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
