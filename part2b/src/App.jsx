import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '111-222-333' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const SubmitChange = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    if (persons.some(person => person.number === newNumber)) {
      alert(`${newNumber} is already added to phonebook`)
      return
    }
    const newPerson = { name: newName, number: newNumber }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const ChangeName = (event) => {
    setNewName(event.target.value)
  }
  const ChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const personList = persons.map(person => (
    <p>{person.name} {person.number}</p>
  ))
  
  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <form onSubmit={SubmitChange}>
          <div>name: <input value={newName} onChange={ChangeName} /></div>
          <div>number: <input value={newNumber} onChange={ChangeNumber} /></div>
          <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
        {personList}
    </div>
  )
}

export default App