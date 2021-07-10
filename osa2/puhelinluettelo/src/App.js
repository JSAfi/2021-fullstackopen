import React, { useState } from 'react'

const Person = ({name}) => {
  return (
    <p>{name}</p>
  )
}

const App = (props) => {
  const [ persons, setPersons] = useState(props.persons) 
  const [ newName, setNewName ] = useState('')

  const handleAddEntry = (event) =>{
    event.preventDefault()
    console.log('button clicked', event)
    
    var onkoListassa = false

    for(var i = 0; i < persons.length; i++) {
      if(persons[i].name === newName) {
        onkoListassa = true
      }
    }

    console.log("onko listassa? ", onkoListassa)

    if (onkoListassa === true) {
      alert(`${newName} on jo listassa!`)
    } else {
      const nameObject = {
        name: newName,
      }
      setPersons(persons.concat(nameObject))
      setNewName('')
    }
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddEntry}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <Person name={person.name} key={person.name} />
      )}
    </div>
  )

}

export default App