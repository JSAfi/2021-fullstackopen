import React, { useEffect, useState } from 'react'
import axios from 'axios'

import personService from './services/persons'

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
        <button onClick = {() => clickHandler(person.id)}> delete </button>
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
    
    var onkoListassa = false

    const isInArray = (find) => find.name === newName

    if(persons.findIndex(isInArray) > -1) {
      onkoListassa = true
    }

    console.log("onko listassa? ", onkoListassa)

    if (onkoListassa === true) {
      alert(`${newName} on jo listassa!`)
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(nameObject)
        .then(returnedPerson => {
          console.log("ennen", persons.length)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          console.log("jälkeen", persons.length)
        })
    }
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  const handleDeleteButton = (id) => {
    console.log("delete button pressed on: ", id)
    console.log(`http://localhost:3001/persons/${id}`)
    personService
      .deleteEntry(id)
      .then(returnedData => {
          console.log(persons.filter((person) => person.id !== id))
          const newPersons = persons.filter((person) => person.id !== id)
          setPersons(newPersons)
      })
  }

  const containsCaseInsensitive = (find) => find.name.toUpperCase().search(filterValue.toUpperCase()) > -1
  const personsToDisplay = persons.filter(containsCaseInsensitive)
  console.log(persons)
  console.log(personsToDisplay)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter = {filterValue} onChange = {handleFilterChange}/>
      <AddNewPerson handler = {handleAddEntry} nameChangeHandler = {handleNameChange} numberChangeHandler = {handleNumberChange}
        newNumber = {newNumber} newName = {newName}/>
      <h2>Numbers</h2>      
        <Persons personsToDisplay={personsToDisplay} clickHandler = {handleDeleteButton}/>
    </div>
  )
}
export default App