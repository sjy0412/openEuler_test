<template>
<div>
	<div class="title">认证申请</div>
  <div class="cert-box">
    
	</div>
</div>
	
</template>

<script>
import { mapMutations } from "vuex";
import { menuService } from "@/utils/menuService.js";
import { noLogin } from "@/utils/publicFunction.js";



export default {
	name: "CertApply",
	data() {
		return {
		};
	},

	created() {
	},

	methods: {
		
	},
};
</script>

<style lang="scss" scoped>
.title {
  margin-top: 24px;
  font-size: 18px;
  font-weight: bold;
  color: #000;
}
.cert-box {
	margin: 24px 40px 24px 0px;
	background: #fefefe;
	padding: 24px;
  
}
</style>
