import axios from 'axios';
import Cookies from 'js-cookie';

// eslint-disable-next-line import/no-cycle
import store from './store';
// eslint-disable-next-line import/no-cycle
import router from './router';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3333/',
});

axiosClient.interceptors.request.use((config) => {
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${store.state.user.token}`;
  return config;
});

axiosClient.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === 401) {
    Cookies.remove('vite_tailwind__token');
    router.push({ name: 'Login' });
  } else if (error.response.status === 404) {
    router.push({ name: 'NotFound' });
  }
  throw error;
});

export default axiosClient;
