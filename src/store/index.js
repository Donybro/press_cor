import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import app from './app';
import registration from './registration';
import organization from './organization';
import worker from './worker';

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    registration,
    organization,
    worker,
  },
});
