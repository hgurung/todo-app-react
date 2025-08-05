import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3030',
  headers: {
    Authorization: process.env.REACT_APP_API_TOKEN || '',
    'Content-Type': 'application/json'
  }
});

export default api;
