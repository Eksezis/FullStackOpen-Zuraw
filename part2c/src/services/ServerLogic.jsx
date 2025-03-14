import axios from "axios";
  const getPersonList = () => {
    return axios.get('http://localhost:3001/persons').then(response => response.data);
  };
  const submitPerson = (newName, newNumber) => {
    const newPerson = { name: newName, number: newNumber };
    return axios.post('http://localhost:3001/persons', newPerson).then(response => response.data);
  };
  const Delete = (id) => {
    return axios.delete(`http://localhost:3001/persons/${id}`)
      .then(() => {console.log(`Person with ID ${id} deleted successfully.`);})
      .catch(error => {console.error('Error deleting person:', error);alert('Failed to delete the person');});
  };
export default { getPersonList, submitPerson, Delete };