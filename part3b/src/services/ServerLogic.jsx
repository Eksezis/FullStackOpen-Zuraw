import axios from 'axios'

const baseUrl = '/persons'

const getPersonList = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const submitPerson = (name, number) => {
  const person = { name, number }
  return axios.post(baseUrl, person).then(response => response.data)
}

const Delete = (id) => {
  return axios.delete(baseUrl+`/${id}`)
    .then(() => {console.log(`Person with ID ${id} deleted successfully.`);})
    .catch(error => {console.error('Error deleting person:', error);alert('Failed to delete the person');});
};

export default { getPersonList, submitPerson, Delete}