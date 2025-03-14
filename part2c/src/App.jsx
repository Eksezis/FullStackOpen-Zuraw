import { useState, useEffect } from 'react'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import ServerLogic from './services/ServerLogic'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    ServerLogic.getPersonList()
      .then(data => {setPersons(data);})
      .catch(error => {console.error('Error fetching data: ', error);});
    },[]
  )

  const SubmitChange = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      updateNumber(newName, newNumber);
      return
    }
    if (persons.some(person => person.number === newNumber)) {
      alert(`${newNumber} is already added to phonebook`)
      return
    }
    ServerLogic.submitPerson(newName, newNumber)
      .then(data => {
        setPersons(persons.concat(data));
        setNewName('');
        setNewNumber('');
      })
      .catch(error => {console.error('Error adding new person: ', error);});
  }

  const Delete = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      ServerLogic.Delete(id).then(() => {
        setPersons(prevPersons => prevPersons.filter(person => person.id !== id));
      });
    }
  }
  
  const updateNumber = (newName, newNumber) => {
    if (persons.some(person => person.name === newName)) {
      if(window.confirm(`Replace the number?`)){
        const person = persons.find(p => p.name === newName)
        ServerLogic.updateNumber(person.id, newNumber).then((updated) => {
          setPersons(persons.map(p => p.id !== updated.id ? p : updated))
        })
      }
    }
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
      <PersonList filteredPersons={filteredPersons} Delete={Delete} />
    </div>
  )
}

export default App
