import { createStore } from 'vuex';
import counterStore from './modules/counterStore';

export default createStore({
  // state: {},
  // getters: {},
  // mutations: {},
  // actions: {},
  modules: {
    counterStore: counterStore,
  },
});
