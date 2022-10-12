const state = {
  detail: {},
}

const mutations = {
  switchInfo(state, val) {
    state.detail = val;
    console.log(state.detail);
  }
};


export default {
  namespaced: true,
  state,
  mutations,
};