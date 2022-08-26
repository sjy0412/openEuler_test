const validate = {
  // 验证账号
  validateAccount(rule, value, callback) {
    if(value.trim().length > 20) {
      callback(new Error('账号长度不超过20！'))
    }else if (value.trim().length <= 0) {
      callback(new Error('请输入账号'))
    }else {
      callback();
    }
  },

  validatePassword(rule, value, callback) {
    if(value.trim().length > 20) {
      callback(new Error('密码长度不超过20！'))
    }else if (value.trim().length <= 0) {
      callback(new Error('请输密码'));
    }else {
      callback();
    }
  },

  validateNewPassword(rule, value, callback) {
    if(value.trim().length > 20) {
      callback(new Error('密码长度不超过20！'))
    }else if (value.trim().length <= 0) {
      callback(new Error('请输密码'));
    }else {
      callback();
    }
  },


}

export { validate }