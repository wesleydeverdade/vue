/* eslint no-param-reassign: "error" */
import { createStore } from 'vuex';
import Cookies from 'js-cookie';

// eslint-disable-next-line import/no-cycle
import axiosClient from '../axios';

const store = createStore({
  state: {
    user: {
      data: {},
      token: Cookies.get('vitailwind__token__') || null,
    },
    home: {
      loading: false,
      data: {},
    },
    about: {
      loading: false,
      data: {},
    },
  },
  getters: {},
  actions: {
    login({ commit }, user) {
      return axiosClient.post('/login', user)
        .then(({ data }) => {
          commit('setUser', data.user);
          commit('setToken', data.token);
          return data;
        });
    },
    logout({ commit }) {
      // return axiosClient.post('/logout')
      // .then(response => {
      commit('logout');
      //  return response;
      // })
    },
  },
  mutations: {
    logout: (state) => {
      state.user.token = null;
      Cookies.remove('vite_tailwind__token');
      state.user.data = {};
    },
    setUser: (state, user) => {
      state.user.data = user;
    },
    setToken: (state, token) => {
      state.user.token = token;
      Cookies.set('vite_tailwind__token', token, { expires: 0.5, SameSite: 'none', secure: true });
    },
    homeLoading: (state, loading) => {
      state.home.loading = loading;
    },
    setHomeData: (state, data) => {
      state.home.data = data;
    },
    setAboutLoading: (state, loading) => {
      state.about.loading = loading;
    },
    setAbout: (state, about) => {
      state.about.links = about.meta.links;
      state.about.data = about.data;
    },
  },
  modules: {},
});

export default store;
