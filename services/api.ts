import axios from 'axios';

// Create axios instance for Random User API
const api = axios.create({
  baseURL: 'https://randomuser.me',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api; 