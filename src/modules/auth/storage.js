import Cookies from 'js-cookie';
import { setBearerToken } from '../../http';

export const setHeaderToken = (token) => setBearerToken(token);

export const getLocalToken = () => Cookies.get('vuex_token');
export const setLocalToken = (token) => Cookies.set('vuex_token', token, { expires: 0.5, SameSite: 'none', secure: true });
export const deleteLocalToken = () => Cookies.remove('vuex_token');
