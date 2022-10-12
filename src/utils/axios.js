import axios from 'axios';

axios.defaults.timeout = 15000;
axios.defaults.baseURL = 'http://170.70.70.173/openEulerTest/console';

axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

// 添加请求拦截器
axios.interceptors.request.use(config => {
  let token = sessionStorage.getItem('token');
  if(config.url.indexOf('login') === -1 &&  config.url.indexOf('update-passwd') === -1 ) {
    token && (config.headers.token = token);
  }else {
    delete config.headers.token;
  }
  if(config.method === 'get' || config.method === 'post') {
    config.url = config.url.indexOf('?') === -1 ? config.url + '?t=' + Math.random() : (config.url = config.url + '&t=' + Math.random());
  }
  return config;
  }, function (error) {
    return Promise.reject(error);
  });

// 添加响应拦截 
axios.interceptors.response.use( response => {
  return response;
},  
(error) => {
  if(error.message.includes('timeout')) {
    this.$message({
        message: '网络超时,请刷新页面重试。',
        duration: 1000,
        type: 'warning',
        showClose: true,
        customClass: 'prompt',
        offset: 100,
    })
  }
  return Promise.reject(error);
});

export default axios;