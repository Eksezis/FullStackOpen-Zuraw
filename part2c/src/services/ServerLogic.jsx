import axios from "axios";
const baseurl = "/api/persons"
  const getPersonList = () => {
    return axios.get(baseurl).then(response => response.data);
  };
  const submitPerson = (newName, newNumber) => {
    const newPerson = { name: newName, number: newNumber };
    return axios.post(baseurl, newPerson).then(response => response.data);
  };
export default { getPersonList, submitPerson};