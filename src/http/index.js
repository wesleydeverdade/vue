import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:5000',
});

const setBearerToken = (token) => {
  http.interceptors.request.use((config) => {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export default { http, setBearerToken };
