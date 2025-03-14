import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  //Pobranie z servera danych i wklejenie do persons
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
      .catch(error => {
        console.error('Error fetching data: ', error)
      })
  }, [])

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
    //Dodanie nowej osoby do servera
    axios
       .post('http://localhost:3001/persons', newPerson)
       .then(response => {
         setPersons(persons.concat(response.data))
         setNewName('')
         setNewNumber('')
       })
       .catch(error => {
         console.error('Error adding new person: ', error)
       })
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
