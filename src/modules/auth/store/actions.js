import axios from '../../../http';
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

export const ActionSetUser = ({ commit }, payload) => {
  commit(types.SET_USER, payload);
};
export const ActionSetToken = ({ commit }, payload) => {
  commit(types.SET_TOKEN, payload);
};
