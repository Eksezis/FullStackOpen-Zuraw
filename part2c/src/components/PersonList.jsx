const PersonList = ({ filteredPersons, Delete }) => (
    <div>
      <h2>Numbers</h2>
      {filteredPersons.map(person => (
        <p key={person.id}>{person.name} {person.number}
          <button onClick={() => Delete(person.id)}>delete</button>
        </p>
      ))}
    </div>
  )

export default PersonList