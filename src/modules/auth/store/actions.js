import Cookies from 'js-cookie';
import { http as axios } from '../../../http';
import * as storage from '../storage';
import * as types from './mutations-types';

export const ActionDoLogin = async ({ dispatch }, payload) => {
  await axios.post('/login', payload)
    .then((response) => {
      dispatch('ActionSetUser', response.data.user);
      dispatch('ActionSetToken', response.data.token);
    })
    .catch((error) => {
    // handle error
      console.log(error);
    });
};

export const ActionCheckToken = ({ dispatch, state }) => {
  console.log('state.token', state.token);

  if (state.token) {
    return Promise.resolve(state.token);
  }

  const token = Cookies.get('vuex_token');

  console.log('vuex_token', token);

  if (!token) {
    return Promise.reject(new Error('Invalid Token'));
  }

  dispatch('ActionSetToken', token);
  return dispatch('ActionLoadSession');
};

export const ActionLoadSession = ({ dispatch }) => Promise(async (resolve, reject) => {
  try {
    const { data: { user } } = await axios.get('/load-session');
    dispatch('ActionSetUser', user);
    resolve();
  } catch (error) {
    dispatch('ActionSignOut');
    reject(error);
  }
});

export const ActionSetUser = ({ commit }, payload) => {
  commit(types.SET_USER, payload);
};

export const ActionSetToken = ({ commit }, payload) => {
  storage.setLocalToken(payload);
  storage.setHeaderToken(payload);
  commit(types.SET_TOKEN, payload);
};

export const ActionSignOut = ({ dispatch }) => {
  storage.setHeaderToken('');
  storage.deleteLocalToken();
  dispatch('ActionSetUser', {});
  dispatch('ActionSetToken', '');
};
