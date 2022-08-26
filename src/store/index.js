import Vue from 'vue';
import Vuex from 'vuex';
import login from './modules/login.js'

Vue.use(Vuex);
let state = {

};

let getters = {};
let mutations = {};
export default new Vuex.Store({
  state: state,
  getters: getters,
  actions: {},
  modules: {
    login,
  }
})
