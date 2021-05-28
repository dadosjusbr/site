import axios from 'axios';
// configures axios to a default api https://github.com/axios/axios#axios-api
const api = axios.create({
  baseURL: 'http://localhost:8081/uiapi/v1/',
});

export default api;
