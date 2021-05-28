import axios from 'axios';
// configures axios to a default api https://github.com/axios/axios#axios-api
const api = axios.create({
  baseURL: 'https://dadosjusbr.org/uiapi/v1/',
});

export default api;
