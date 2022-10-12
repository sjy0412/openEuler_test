import axios from "axios";

const accountService = {
  // 获取账号列表
  getUserList(params) {
    const url = '/rest/v1/manager/user-list';
    return axios.post(url, params);
  },

  // 添加账号
  addAccount(params) {
    const url = '/rest/v1/manager/add-user';
    return axios.post(url, params);
  },

  // 删除账号
  deleteAccount(id) {
    const url = '/rest/v1/manager/delete-user';
    return axios.post(url, id);
  },

  // 编辑账号信息
  editAccount(params) {
    const url = '/rest/v1/manager/update-user';
    return axios.post(url, params);
  }
}

export { accountService }