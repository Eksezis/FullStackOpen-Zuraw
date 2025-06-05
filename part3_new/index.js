import express from 'express'
import http from 'http'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'


////
const mongoose_url = 'mongodb+srv://Eksezis:<db_password>@cluster0.ak0xhj2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'


////

const app = express()

app.use(express.static('dist'));
app.use(cors())
app.use(morgan(':method :url :status :response-time ms - :body'));
app.use(express.json())

morgan.token('body', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
  return '';
});


let persons = [
    { "id": "1","name": "Arto Hellas", "number": "040-123456"},
    { "id": "2","name": "Ada Lovelace", "number": "39-44-5323523"},
    { "id": "3","name": "Dan Abramov", "number": "12-43-234345"},
    { "id": "4","name": "Mary Poppendieck", "number": "39-23-6423122"}
]

app.get('/persons', (request, response) => {
    response.json(persons)
})

app.get('/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).json({Error: 'Person does not exist' }).end()
    }
})

app.post('/persons', (request, response) => {
  const person = request.body
  const id = (Math.random() * 1000 + 5).toFixed(0);

  const Id = persons.find(p => p.id === id);
  const Name = persons.find(p => p.name === person.name);
  const Number = persons.find(p => p.number === person.number);

  if(Id){return response.status(400).json({ error: 'id must be unique' });}
  if(Name){return response.status(400).json({ error: 'name must be unique' });}
  if(Number){return response.status(400).json({ error: 'number must be unique' });}

  const newPerson = {id: id, ...person};
  persons.push(newPerson);
  response.json(newPerson);
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})