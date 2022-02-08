import axios from 'axios';
// import interceptors from './interceptors';
import store from '../store';

const http = axios.create({
  baseURL: 'http://localhost:5000',
});

http.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === 401) {
    store.dispatch('auth/ActionSignOut');

    next({ name: 'Login' });
  }
  // else if (error.response.status === 404) {
  // next({ name: 'Login' });
  // next({ name: 'NotFound' });
  // }
  throw error;
});
const setBearerToken = (token) => {
  http.interceptors.request.use((config) => {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export { http, setBearerToken };
