import store from '../store';

export default async (to, from, next) => {
  document.title = to.name;

  if (to.name !== 'Login' && !store.getters['auth/hasToken']) {
    try {
      await store.dispatch('auth/ActionCheckToken');

      next({ path: to.path });
    } catch (err) {
      next({ name: 'Login' });
    }
  } else if (to.name === 'Login' && store.getters['auth/hasToken']) {
    next({ name: 'Home' });
  } else {
    next();
  }
};
