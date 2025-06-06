const express =  require('express')
const http =  require('http')
const morgan =  require('morgan')
const cors =  require('cors')
const mongoose =  require('mongoose')

const Person = require('./models/person')
require('dotenv').config()
////////////////////////////////////////////////
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
////////////////////////////////////////////////


////////////////////////////////////////////////

app.get('/persons', (request, response) => {
  Person.find({ important: true }).then(result => {
    response.json(result)
  })
})

app.post('/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
      return response.status(400).json({ error: 'name or number missing' });
    }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
    important: true,
  })
  
  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    response.json(result)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})