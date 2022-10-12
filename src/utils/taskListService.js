import axios from '@/utils/axios';

const taskListService = {
  // 获取列表
  getList(params) {
    const url = `/rest/v1/test-task/test-list`;
		return axios.post(url, params);
  },

  // 填写失败原因
  setFailReason(params) {
    const url = `/rest/v1/test-task/set-failure-reason`;
		return axios.post(url, params);
  },

  // 终止测试
  terminateTest(params) {
    const url = `/rest/v1/test-task/terminate-test`;
		return axios.post(url, params);
  },

  // 获取详情
  getPreview(projectId,requestId) {
    const url = `/rest/v1/test-task/${projectId}/test-preview?requestId=${requestId}`;
		return axios.get(url);
  }

}

export { taskListService };