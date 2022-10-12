const state = {
  dorpDownDetail: {
    id: "",
    name: "",
    description: "",
    permission: "",
  },
};

const mutations = {
  switchDetail(state, val) {
    let authority = "";
    if (val.authority == 0) {
      authority = "普通用户";
    } else if (val.authority === 1) {
      authority = "超级管理员";
    } else if (val.authority === 2) {
      authority = "项目支撑人员";
    } else if (val.authority === 3) {
      authority = "实验室管理员";
    }
    state.dorpDownDetail = {
      id: val.id,
      name: val.name,
      description: val.description,
      authority: authority,
    };
  },
};


export default {
  namespaced: true,
  state,
  mutations,
};
