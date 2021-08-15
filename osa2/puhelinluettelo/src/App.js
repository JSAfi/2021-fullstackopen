import React, { useEffect, useState } from 'react'

import personService from './services/persons'

const Notification = ({message}) => {
  if(message===null) {
    return null
  }
  return (
    <div className="info">
      {message}
    </div>
  )
}
const Error = ({message})=> {
  if(message===null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )  
}

const Person = (props) => {
  return (
    <li>{props.name} {props.number}</li>
  )
}
	
const Persons = ({personsToDisplay, clickHandler}) => {
  return (
    personsToDisplay.map(person => 
      <div key={person.name}>
        <Person name= {person.name} number={person.number}/> 
        <button onClick = {() => clickHandler(person.id, person.name)}> delete </button>
      </div>
      
  ))
}

const Filter = (props) => {
  return(
    <div>
      filter shown with <input value={props.filter} onChange={props.onChange} />
    </div>
  )
}

const AddNewPerson = (props) => {
  return (
      <form onSubmit={props.handler}>
        <div>
          name: <input value={props.newName} onChange={props.nameChangeHandler}/>
        </div>
        <div> 
          number: <input value={props.newNumber} onChange={props.numberChangeHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

  )
}

const App = (props) => {
  const [ persons, setPersons] = useState(props.persons) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterValue, setNewFilter] = useState('')
  const [ infoMessage, setInfoMessage] = useState(null)
  const [ errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialData => {
        setPersons(initialData)
      })
  }, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleAddEntry = (event) =>{
    event.preventDefault()
    console.log('button clicked', event)
    
    const isInArray = (find) => find.name.toUpperCase() === newName.toUpperCase()
    const foundIndex = persons.findIndex(isInArray)

    if( foundIndex > -1) {
      const foundEntry = persons[foundIndex]
      console.log('nimi on jo listassa: ', foundEntry.name)
      if(window.confirm(`${foundEntry.name} is already added to phonebook, replace the old number with a new one?`)) {
        const nameObject = {...foundEntry, number: newNumber}
        console.log("on listassa, uusi: ", nameObject)
        console.log("on listassa, vanha: ", foundEntry)
        personService
          .update(foundEntry.id, nameObject) 
          .then(returnedPerson => {
            console.log('update')
            setPersons(persons.map(person => person.id !== foundEntry.id ? person : returnedPerson))          
            setInfoMessage(`'${nameObject.name}' successfully updated!`)
            setTimeout(() => {
              setInfoMessage(null)
            }, 5000)
          })
          .catch(error =>{
            setErrorMessage(`'${nameObject.name}' was already deleted from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setInfoMessage(`'${nameObject.name}' was added!`)
          setTimeout(()=>{
            setInfoMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error.response)
          setErrorMessage(`${error.response.data.error}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
    setNewName('')
    setNewNumber('')
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  const handleDeleteButton = (id, name) => {
    console.log("delete button pressed on: ", id)
    console.log(`http://localhost:3001/persons/${id}`)

    if(window.confirm(`Delete ${name} ?`)) {
      personService
        .deleteEntry(id)
        .then(returnedData => {
            console.log(persons.filter((person) => person.id !== id))
            const newPersons = persons.filter((person) => person.id !== id)
            setPersons(newPersons)
        })
        .catch(error =>{
          setErrorMessage(`'${name}' was already deleted from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const containsCaseInsensitive = (find) => find.name.toUpperCase().search(filterValue.toUpperCase()) > -1
  const personsToDisplay = persons.filter(containsCaseInsensitive)
  console.log(persons)
  console.log(personsToDisplay)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={infoMessage} />
      <Error message={errorMessage} />
      <Filter filter = {filterValue} onChange = {handleFilterChange}/>
      <AddNewPerson handler = {handleAddEntry} nameChangeHandler = {handleNameChange} numberChangeHandler = {handleNumberChange}
        newNumber = {newNumber} newName = {newName}/>
      <h2>Numbers</h2>      
        <Persons personsToDisplay={personsToDisplay} clickHandler = {handleDeleteButton}/>
    </div>
  )
}
export default App