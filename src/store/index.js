import Vue from 'vue';
import Vuex from 'vuex';
import login from './modules/login';
import menu from './modules/menu';
import detail from './modules/detail';

Vue.use(Vuex);
let state = {
  statusCode: {
    SUCCESS: '0000',
    LOGIN_FAILED: '9999',
    REQUEST_FAILED: '4001' 
  }
};

let getters = {};
let mutations = {};
export default new Vuex.Store({
  state: state,
  getters: getters,
  actions: {},
  modules: {
    login,
    menu,
    detail
  }
})
