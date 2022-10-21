<template>
	<div class="table-list">
		<el-table :data="tableData" border resizable style="width: 100%">
			<el-table-column prop="status" label="状态">
				<template v-slot="data">
					<span :class="['status', data.row.status === '已分配' ? 'green' : '']">{{ data.row.status }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="applyTime" label="开始时间">
				<template v-slot="data">
					<span>{{ data.row.applyTime ? data.row.applyTime : '-' }}</span>
				</template> 
			</el-table-column>
			<el-table-column prop="queuePosition" label="位次" v-if="!isAssign">
				<template v-slot="data">
					<span>{{ data.row.queuePosition ? data.row.queuePosition : '-' }}</span>
				</template>	
			</el-table-column>
			<el-table-column prop="assignTime" label="分配到服务器时间" v-if="isAssign">
				<template v-slot="data">
					<span>{{ data.row.assignTime ? data.row.assignTime : '-' }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="ipAddress" label="IP地址" v-if="isAssign"> 
				<template v-slot="data">
					<span>{{ data.row.ipAddress ? data.row.ipAddress : '-' }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="region" label="区域" v-if="isAssign">
				<template v-slot="data">
					<span>{{ data.row.region ? data.row.region : '-' }}</span>
				</template> </el-table-column>
			<el-table-column prop="account" label="账号" v-if="isAssign">
				<template v-slot="data">
					<span>{{ data.row.account ? data.row.account : '-' }}</span>
				</template> </el-table-column>
			<el-table-column prop="password" label="密码" v-if="isAssign">
				<template v-slot="data">
					<span>{{ data.row.password ? data.row.password : '-' }}</span>
				</template> </el-table-column>
			<el-table-column prop="jumperIp" label="跳板机IP" v-if="isAssign">
				<template v-slot="data">
					<span>{{ data.row.jumperIp ? data.row.jumperIp : '-' }}</span>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "AssignServer",
	data() {
		return {
			tableData: [],
			isAssign: false,
		};
	},
	computed: {
		...mapState("detail", {
			detailData: "detail",
		}),
	},
	created() {
		if (this.detailData.queue) {
			this.tableData.push(this.detailData.queue);
			this.isAssign = false;
		} else {
			this.tableData.push(this.detailData.server);
			this.isAssign = true;
		}
	},
};
</script>

<style lang="scss" scoped>
.table-list {
	margin-left: 28px;
	margin-right: 24px;
	margin-top: 16px;
	.status {
		margin-left: 20px;
	}
	.status::before {
		position: absolute;
		display: block;
		width: 8px;
		height: 8px;
		background: #f97611;
		border-radius: 50%;
		content: "";
		top: 50%;
		transform: translate(0, -50%);
	}
	.green::before {
		background: #24ab36;
	}
}
::v-deep .el-table--border .el-table__cell:first-child .cell {
	padding-left: 16px;
}
::v-deep .el-table--border th.el-table__cell,
.el-table__fixed-right-patch {
	background: #f4f6fa;
	height: 36px;
}
::v-deep .el-table__row {
	height: 48px;
}
</style>
