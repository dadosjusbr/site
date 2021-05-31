import axios from 'axios';
// configures axios to a default api https://github.com/axios/axios#axios-api
const api = axios.create({
  baseURL: process.env.API_BASE_URL,
});

export default api;
