import axios from 'axios';
import {HOST} from './routes';

const instance = axios.create({
  baseURL: HOST,
  timeout: 10000,
});

export default instance;

// instance.interceptors.response.use(null, async (error) => {
//   error.errorMessage = error?.response?.data ?? ERROR_SERVER_UNKNOWN;
//   return Promise.reject(error);
// });
