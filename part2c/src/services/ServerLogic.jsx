import { useEffect } from "react"
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
 export default BackEnd;