import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  const baseUrl = 'https://restcountries.com/v3.1/name'

  useEffect(() => {
    console.log(name)
    axios.get(`${baseUrl}/${name}`)
          .then(response => {
            console.log(response.data[0])
            const country = {
              data: {
                name: response.data[0].name.common,
                population: response.data[0].population,
                capital: response.data[0].capital,
                flag: response.data[0].flags.png
              },
              found: true
            }
            setCountry(country)
          })
          .catch(error => {
            console.log("ERROR", error)
            setCountry({found: false})
          })

  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }
  
  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
