import React, { useState } from 'react'

const Person = (props) => {
  return (
    <p>{props.name} {props.number}</p>
  )
}

const App = (props) => {
  const [ persons, setPersons] = useState(props.persons) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterValue, setNewFilter] = useState('')

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
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const containsCaseInsensitive = (find) => find.name.toUpperCase().search(filterValue.toUpperCase()) > -1
  const personsToDisplay = persons.filter(containsCaseInsensitive)
  console.log(persons)
  console.log(personsToDisplay)

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value={filterValue} onChange={handleFilterChange} />
      <form onSubmit={handleAddEntry}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div> 
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>      
      {personsToDisplay.map(person => 
        <Person name={person.name} number={person.number} key={person.name} />
      )}
    </div>
  )

}

export default App