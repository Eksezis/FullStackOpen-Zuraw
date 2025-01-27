import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const SubmitChange = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newPerson = { name: newName }
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  const ChangeName = (event) => {
    setNewName(event.target.value)
  }

  const personList = persons.map(person => (
    <p>{person.name}</p>
  ))
  
  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <form onSubmit={SubmitChange}>
        <div>
          name: <input value={newName} onChange={ChangeName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {personList}
    </div>
  )
}

export default App