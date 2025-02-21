import { useState } from 'react'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'

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
    const newPerson = { name: newName, number: newNumber, id: persons.length + 1 }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const NameChange = (event) => {
    setNewName(event.target.value)
  }

  const NumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const SearchChange = (event) => {
    setSearch(event.target.value)
  }

  // Filter persons based on search input
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Search search={search} onSearchChange={SearchChange} />
      <h2>Add a new</h2>
      <PersonForm 
        newName={newName} 
        newNumber={newNumber} 
        onNameChange={NameChange} 
        onNumberChange={NumberChange} 
        onSubmit={SubmitChange} 
      />
      <PersonList filteredPersons={filteredPersons} />
    </div>
  )
}

export default App
