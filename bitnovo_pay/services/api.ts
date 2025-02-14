import axios from 'axios';

const API_BASE_URL = 'https://payments.pre-bnvo.com/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-Device-Id': '0ad5655f-3a4f-4665-a866-9f728dce2af0',
  },
});

export default api;