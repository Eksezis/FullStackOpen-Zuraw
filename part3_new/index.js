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

////////////////////////////////////////////////

app.get('/persons', (request, response) => {
  Person.find({ important: true }).then(result => {
    response.json(result)
  })
})

app.post('/persons', (request, response) => {
  const { name, number } = request.body;

  if (!name || !number) {
    return response.status(400).json({ error: 'name and number are required' });
  }

  const person = new Person({
    name,
    number,
    important: true,
  });

  person.save()
    .then(result => {
      response.status(201).json(result);
    })
    .catch(error => {
      console.error(error);
      response.status(500).json({ error: 'Failed to save person' });
    });
});

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})