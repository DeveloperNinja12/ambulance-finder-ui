import { baseUrl } from './constants';
import axios, { type AxiosResponse, AxiosError} from 'axios';

const apiClient = axios.create({
    baseURL: baseUrl,
    headers: {
    'Content-Type': 'application/json'
 },
 timeout: 10000,
});

apiClient.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    (error: AxiosError) => {
      console.error('API Error:', error.response || error.message)
      return Promise.reject(error.response?.data || error.message)
    }
  );

  export default apiClient;