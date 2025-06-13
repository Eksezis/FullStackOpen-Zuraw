const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')
require('dotenv').config()

const app = express()

const PORT = process.env.PORT

app.use(express.static('dist'))
app.use(cors())

morgan.token('body', (req) => (req.method === 'POST' ? JSON.stringify(req.body) : ''))
app.use(morgan(':method :url :status :response-time ms - :body'))

app.use(express.json())

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}



mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error.message)
  })

app.get('/persons', (req, res) => {
  Person.find({ important: true })
    .then(result => res.json(result))
})

app.get('/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(result => res.json(result))
    .catch(error => next(error))
})

app.put('/persons/:id', (req, res, next) => {
  const { number } = req.body;
  Person.findByIdAndUpdate(
    req.params.id,
    { number },
    { new: true, runValidators: true, context: 'query' }
  )
  .then(updatedPerson => {
    if(updatedPerson) {
      res.json(updatedPerson);
    } else {
      res.status(404).json({ error: 'Person not found' });
    }
  })
  .catch(error => next(error))
});

app.post('/persons', (req, res, next) => {
  const { name, number } = req.body
  if (!name || !number) {
    return res.status(400).json({ error: 'name and number are required' })
  }

  const person = new Person({ name, number, important: true })
  person.save()
    .then(saved => res.status(201).json(saved))
    .catch(error => next(error))
})

app.delete('/persons/:id', (req, res, next) => {
  console.log('DELETE request for id:', req.params.id)
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      if (result) {
        console.log('Deleted:', result)
        res.status(204).end()
      } else {
        const error = new Error('Person not found')
        error.name = 'NotFound'
        next(error)
      }
    })
    .catch(error => next(error))
})
app.use(errorHandler)