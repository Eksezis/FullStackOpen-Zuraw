import axios from "axios";
  const getPersonList = () => {
    return axios.get('http://localhost:3001/persons').then(response => response.data);
  };
  const submitPerson = (newName, newNumber) => {
    const newPerson = { name: newName, number: newNumber };
    return axios.post('http://localhost:3001/persons', newPerson).then(response => response.data);
  };
export default { getPersonList, submitPerson };