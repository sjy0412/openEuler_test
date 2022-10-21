import { MessageBox } from 'element-ui';
import router from '@/router'

function showMessage(type, message) {
  this.$message({
    message: message,
    type: type,
  });
}

function noLogin() {
    MessageBox.confirm('当前登录超时，请重新登录!', '会话过期', {
        confirmButtonText: '确定',
        showCancelButton: false,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        showClose: false,
    }).then(() => {
        window.location.href= '/openEulerTest/console/#/login'
    })
    .catch(() => {
      
    })
}

export {
    showMessage,
    noLogin,
}