const state = {
  changePassword: false
};

const mutations = {
  switchForm(state, val) {
    state.changePassword = val;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
}