import axios from '@/utils/axios';

const loginService = {
  // 登录
  login(params) {
      let url = '/login';
    return axios.post(url, params); 
  },

  // 登出
  logout() {
    let url = '/logout';
    return axios.post(url);
  },

  // 修改账号密码
  changePassword(params) {
    let url = '/update-passwd';
    return axios.post(url, params);
  },
  
  // 获取用户权限
  getUserRole() {
    let url = '/get-user-role';
    return axios.post(url);
  }

}

export { loginService };