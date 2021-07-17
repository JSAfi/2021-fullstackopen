import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Person = (props) => {
  return (
    <li>{props.name} {props.number}</li>
  )
}

const Persons = ({personsToDisplay}) => {
  return (
    personsToDisplay.map(person => 
      <Person name= {person.name} number={person.number} key={person.name}/>
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
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response=> {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
    }, []
  )

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
        <Persons personsToDisplay={personsToDisplay} />
    </div>
  )
}
export default App