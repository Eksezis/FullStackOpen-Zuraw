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
  console.log('Deleting person with ID:', id)
  return axios.delete(`${baseUrl}/${id}`)
    .then(() => {console.log(`Person with ID ${id} deleted successfully.`);})
    .catch(error => {
      console.error('Error deleting person:', error);
      alert('Failed to delete the person');
    });
};

const updateNumber = (id, newNumber) => {
    console.log(id);
    return axios.put(`${baseUrl}/${id}`, {number: newNumber})
      .then(response => {return response.data;})
      .catch(error => {console.error('Error updating resource:', error);});
  };

  export default { getPersonList, submitPerson, Delete, updateNumber };