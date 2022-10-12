import axios from "axios";

const managementService = {

  getList(params) {
    const url = '/rest/v1/server-management/list';
    return axios.post(url, params);
  },

  // 增加服务器
  addServer(params) {
    const url = '/rest/v1/server-management/add-server';
    return axios.post(url, params);
  },

  // 获取表头过滤信息
  getFilterList() {
    const url = '/rest/v1/server-management/list-filter-item';
    return axios.get(url);
  },

  deleteServer(params) {
    const url = '/rest/v1/server-management/delete-server';
    return axios.post(url, params);
  },

}

export { managementService }