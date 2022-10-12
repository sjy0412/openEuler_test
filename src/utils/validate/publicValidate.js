const publicValidate = {
  // 验证电话号码
  phoneValidate(rule, value, callback) {
    const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    value = value === undefined ? '' : value.trim();
    if(value.length <= 0) {
      callback(new Error('手机号码不能为空'));
    }else if(!reg.test(value)) {
      callback(new Error('请输入正确的手机号码'));
    }else {
      callback();
    }
  },

  // 验证邮箱
  emailValidate(rule, value, callback) {
    const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    value = value === undefined ? '' : value.trim();
    if(value.length <= 0) {
      callback(new Error('邮箱不能为空'));
    }else if(!reg.test(value)) {
      callback(new Error('请输入正确的邮箱'));
    }else {
      callback();
    }
  },

  // 验证姓名
  nameValidate(rule, value, callback) {
    var reg = /^[\u4e00-\u9fa5]{2,4}$/;
    value = value === undefined ? '' : value.trim();
    if(value.length <= 0) {
      callback(new Error('姓名不能为空'));
    }else if(!reg.test(value)) {
      callback(new Error('姓名只能为2-4中文！'))
    }else {
      callback();
    }
  },

  

}

export { publicValidate }