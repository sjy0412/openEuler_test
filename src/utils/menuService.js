import axios from "@/utils/axios";

const menuService = {
	// 获取下拉菜单
	getList() {
		const url = '/rest/v1/drop-down-box/item-list';
		return axios.get(url);
	},

	getItem(id) {
		const url = `/rest/v1/drop-down-box/${id}/item`;
		return axios.get(url);
	},

	// 创建下拉框
	createItem(params) {
		const url = `/rest/v1/drop-down-box/item`;
		return axios.post(url, params);
	},

	// 新增下拉框关系
	addRelation(params) {
		const url = `/rest/v1/drop-down-box/add-relation`;
		return axios.post(url, params);
	},

	// 删除下拉框
	deleteItem(id) {
		const url = `/rest/v1/drop-down-box/delete-item?id=${id}`;
		return axios.post(url);
	},

	
};

export { menuService };
