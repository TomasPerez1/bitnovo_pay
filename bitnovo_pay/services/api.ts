import axios from 'axios';

const API_BASE_URL = 'https://payments.pre-bnvo.com/api/v1';
const X_DEVICE_ID  = process.env.NEXT_PUBLIC_X_DEVICE_ID;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-Device-Id': X_DEVICE_ID,
  },
});

export default api;