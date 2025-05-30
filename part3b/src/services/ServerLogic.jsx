import axios from 'axios'

const baseUrl = '/persons'

const getPersonList = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const submitPerson = (name, number) => {
  const person = { name, number }
  return axios.post(baseUrl, person).then(response => response.data)
}

export default { getPersonList, submitPerson }