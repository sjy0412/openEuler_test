const validate = {
  // 验证设备ID
  validateDeviceId(rule, value, callback) {
    const reg = /^DC\d\_\d{2}\_\d{3}$/;
    if (value.trim().length <= 0) {
      callback(new Error('请输入设备ID'))
    }else if(!reg.test(value.trim())) {
      callback(new Error('请输入正确的设备ID'))
    }else {
      callback();
    }
  },
}

export { validate }