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
  const updateNumber = (id, newNumber) => {
    return axios.patch(`http://localhost:3001/persons/${id}`, {number: newNumber})
      .then(response => {return response.data;})
      .catch(error => {console.error('Error updating resource:', error);});
  };
export default { getPersonList, submitPerson, Delete, updateNumber };