import axios from 'axios'

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:',
    headers: {
        Authorization: process.env.REACT_APP_API_TOKEN
    }
})

export default api
