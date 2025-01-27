import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

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

  const SearchChange = (event) => {
    setSearch(event.target.value)
  }
  
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  )

  const personList = filteredPersons.map(person => (
    <p key={person.id}>{person.name} {person.number}</p>
  ))

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>filter shown with: 
          <input value={search} onChange={SearchChange} />
        </div>
      </form>
      <h2>Add a new</h2>
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