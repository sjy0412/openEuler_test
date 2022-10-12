"use strict";(self["webpackChunkopeneuler_test"]=self["webpackChunkopeneuler_test"]||[]).push([[916],{5266:function(e,t,l){l.d(t,{Z:function(){return c}});var a=function(){var e=this,t=e._self._c;return t("div",{staticClass:"filter"},[t("el-popover",{attrs:{"visible-arrow":!1,width:"120px",placement:"bottom-end",trigger:"click","popper-class":"filter-table"},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[t("el-checkbox-group",{staticClass:"filter-top",on:{change:e.handleChoose},model:{value:e.filterVal,callback:function(t){e.filterVal=t},expression:"filterVal"}},e._l(e.selectOption,(function(e){return t("el-checkbox",{key:e.value,attrs:{label:e.label,value:e.value,disabled:e.disabled}})})),1),t("div",{staticClass:"el-table-filter_bottom"},[t("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.filterTable}},[e._v(" 确认 ")]),t("el-button",{attrs:{type:"default",size:"small"},on:{click:e.cancel}},[e._v(" 重置 ")])],1),t("el-button",{staticClass:"setting",attrs:{slot:"reference",size:"mini",icon:"el-icon-setting"},slot:"reference"})],1)],1)},i=[],r={name:"FilterTable",props:["selectOption","filterSelected","headerInit"],data(){return{filterVal:[],visible:!1,filterChoose:[]}},created(){this.filterVal=this.filterSelected},watch:{filterSelected(e){this.filterSelected=e,this.filterVal=e,this.filterChoose=e}},methods:{handleChoose(e){this.filterChoose=e},filterTable(){this.$emit("handleFilter",this.filterChoose),this.visible=!1},cancel(){this.filterVal=this.headerInit,this.filterChoose=this.headerInit,this.filterTable()}}},s=r,o=l(1001),n=(0,o.Z)(s,a,i,!1,null,"fee41970",null),c=n.exports},9882:function(e,t,l){l.d(t,{Z:function(){return c}});var a=function(){var e=this,t=e._self._c;return t("div",{staticClass:"filter"},[t("el-popover",{attrs:{"visible-arrow":!1,width:"120px",placement:"bottom-start",trigger:"click","popper-class":"filter-table"},model:{value:e.isShowFilter,callback:function(t){e.isShowFilter=t},expression:"isShowFilter"}},[t("el-checkbox-group",{on:{change:e.handleChoose},model:{value:e.filterVal,callback:function(t){e.filterVal=t},expression:"filterVal"}},[e._l(e.selectOption,(function(e){return t("el-checkbox",{key:e.value,attrs:{label:e.label,value:e.value}})})),t("div",{staticClass:"el-table-filter_bottom"},[t("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.filterTable}},[e._v(" 确认 ")]),t("el-button",{attrs:{type:"default",size:"small"},on:{click:e.cancel}},[e._v(" 重置 ")])],1)],2),t("p",{staticClass:"table-header",attrs:{slot:"reference"},slot:"reference"},[e._v(" "+e._s(e.headerLabel)+" "),0===e.filterSelected.length?t("img",{attrs:{src:l(2113),alt:""}}):t("img",{attrs:{src:l(3341),alt:""}})])],1)],1)},i=[],r={name:"FilterTable",props:["selectOption","headerLabel","filterSelected","filterKey"],data(){return{filterVal:[],isShowFilter:!1,filterChoose:[]}},created(){this.filterVal=this.getSelected()},watch:{filterSelected(e){console.log(e),this.filterSelected=e,this.filterVal=e,this.filterChoose[this.filterKey]=e}},methods:{handleChoose(e){this.filterChoose[this.filterKey]=e},getSelected(){let e=[];return this.filterVal.forEach((t=>{this.selectOption.forEach((l=>{t===l.value&&e.push(l.value)}))})),e},filterTable(){this.$emit("handleFilter",this.filterChoose),this.isShowFilter=!1},cancel(){this.filterVal=[],this.filterChoose[this.filterKey]=[],this.filterTable()}}},s=r,o=l(1001),n=(0,o.Z)(s,a,i,!1,null,"f8f8662c",null),c=n.exports},1916:function(e,t,l){l.r(t),l.d(t,{default:function(){return w}});l(6699);var a=function(){var e=this,t=e._self._c;return t("div",{staticClass:"taskList-box"},[t("div",{staticClass:"list-box"},[t("div",{staticClass:"search-box"},[t("div",[t("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.handleEdit()}}},[e._v("添加人员")]),t("el-button",{attrs:{disabled:0===e.multipleSelection.length},on:{click:e.handleDelete}},[e._v("批量删除")])],1),t("div",{staticClass:"task-search"},[t("img",{directives:[{name:"show",rawName:"v-show",value:e.keyword&&e.clearShow,expression:"keyword && clearShow"}],staticClass:"input-clear",attrs:{src:l(2498)},on:{mousedown:e.clearKeyword}}),t("el-input",{attrs:{type:"text",placeholder:"请输入搜索内容","prefix-icon":"el-icon-search"},on:{change:e.searchData,focus:function(t){e.clearShow=!0}},model:{value:e.keyword,callback:function(t){e.keyword=t},expression:"keyword"}}),t("FilterHeader",{attrs:{selectOption:e.headerLabel,headerInit:e.headerInit,filterSelected:e.headerSelected},on:{handleFilter:e.filterHeader}})],1)]),e.chooseList.length>0?t("div",{staticClass:"filter-list"},[t("span",{staticClass:"found"},[e._v(" 已找到 "),t("el-tag",{staticStyle:{"margin-left":"5px",color:"#252b3a"},attrs:{type:"round",size:"small"}},[e._v(" "+e._s(e.pagination.total)+" ")]),e._v(" : ")],1),e._l(e.chooseList,(function(l,a){return t("el-tooltip",{key:a,staticClass:"item",attrs:{effect:"light",content:l.value,placement:"top"}},[t("el-tag",{attrs:{type:"info",closable:""},on:{close:function(t){return e.handleClose(l)}}},[e._v(" "+e._s(l.value)+" ")])],1)})),t("span",{staticClass:"clear-all",on:{click:function(t){return e.clearAll()}}},[e._v("全部清除")])],2):e._e(),t("div",{staticClass:"task-table"},[t("el-table",{ref:"filterTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,"tooltip-effect":"light tooltip-end",resizable:"",border:""},on:{"selection-change":e.handleSelectionChange}},[t("template",{slot:"empty"},[t("img",{attrs:{src:l(5719)}})]),t("el-table-column",{attrs:{type:"selection",width:"30"}}),t("el-table-column",{attrs:{prop:"userName",label:e.headerLabel[0].label}}),e.headerSelected.includes(e.headerLabel[1].label)?t("el-table-column",{attrs:{prop:"uniportalId",label:e.headerLabel[1].label,"show-overflow-tooltip":""}}):e._e(),e.headerSelected.includes(e.headerLabel[2].label)?t("el-table-column",{attrs:{prop:"testOrganization","show-overflow-tooltip":""},scopedSlots:e._u([{key:"header",fn:function({}){return t("div",{},[t("FilterTable",{attrs:{selectOption:e.filters.testOrganization,headerLabel:e.headerLabel[2].label,filterSelected:e.filterSelected.testOrganization,filterKey:"testOrganization"},on:{handleFilter:e.filterChange}})],1)}}],null,!1,2424874749)}):e._e(),e.headerSelected.includes(e.headerLabel[3].label)?t("el-table-column",{attrs:{prop:"roleDesc","show-overflow-tooltip":""},scopedSlots:e._u([{key:"header",fn:function({}){return t("div",{},[t("FilterTable",{attrs:{selectOption:e.filters.role,headerLabel:e.headerLabel[3].label,filterSelected:e.filterSelected.role,filterKey:"role"},on:{handleFilter:e.filterChange}})],1)}}],null,!1,3182884933)}):e._e(),e.headerSelected.includes(e.headerLabel[4].label)?t("el-table-column",{attrs:{prop:"groupList",label:e.headerLabel[4].label,"show-overflow-tooltip":""},scopedSlots:e._u([{key:"header",fn:function({}){return t("div",{},[t("FilterTable",{attrs:{selectOption:e.filters.group,headerLabel:e.headerLabel[4].label,filterSelected:e.filterSelected.group,filterKey:"group"},on:{handleFilter:e.filterChange}})],1)}},{key:"default",fn:function(l){return e._l(l.row.groupList,(function(a,i){return t("span",{key:i},[e._v(" "+e._s(a)+" "),i!==l.row.groupList.length-1?t("span",[e._v(",")]):e._e(),0===l.row.groupList.length?t("span",[e._v("-")]):e._e()])}))}}],null,!1,3106571465)}):e._e(),e.headerSelected.includes(e.headerLabel[5].label)?t("el-table-column",{attrs:{prop:"telephone",label:e.headerLabel[5].label,"show-overflow-tooltip":""}}):e._e(),e.headerSelected.includes(e.headerLabel[6].label)?t("el-table-column",{attrs:{prop:"email",label:e.headerLabel[6].label,"show-overflow-tooltip":""}}):e._e(),e.headerSelected.includes(e.headerLabel[7].label)?t("el-table-column",{attrs:{prop:"operate",label:e.headerLabel[7].label,minWidth:"120","column-key":"ope","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(l){return[t("div",{staticClass:"opera-btn"},[t("button",{on:{click:function(t){return e.handleDelete(l.row.id)}}},[e._v(" 删除 ")]),t("button",{on:{click:function(t){return e.handleEdit(l.row)}}},[e._v("编辑")])])]}}],null,!1,3808842813)}):e._e()],2),t("el-pagination",{attrs:{"current-page":e.pagination.currentPage,"page-sizes":e.pagination.pageSizes,"page-size":e.pagination.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.pagination.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)]),t("el-dialog",{attrs:{title:"添加人员",visible:e.dialogVisible,"close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogVisible=t}}},[t("Dialog",{attrs:{editData:e.editData},on:{cancel:e.cancel}})],1)],1)},i=[],r=l(9882),s=l(5266),o=function(){var e=this,t=e._self._c;return t("div",[t("el-form",{ref:"form",attrs:{rules:e.rules,model:e.form,"label-position":"left","label-width":"80px"}},[t("el-form-item",{attrs:{label:"测试机构",prop:"testOrganization"}},[t("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.testOrganization,callback:function(t){e.$set(e.form,"testOrganization",t)},expression:"form.testOrganization"}},e._l(e.testOptions,(function(e){return t("el-option",{key:e.label,attrs:{label:e.label,value:e.value}})})),1)],1),t("el-form-item",{attrs:{label:"角色",prop:"labManager"}},[t("el-radio-group",{model:{value:e.form.labManager,callback:function(t){e.$set(e.form,"labManager",t)},expression:"form.labManager"}},[t("el-radio",{attrs:{label:"项目支撑人员",name:"labManager"}}),t("el-radio",{attrs:{label:"实验室管理员",name:"labManager"}})],1)],1),t("el-form-item",{attrs:{label:"群组",prop:"groupList"}},[t("el-checkbox-group",{on:{change:e.handleGroupChange},model:{value:e.form.groupList,callback:function(t){e.$set(e.form,"groupList",t)},expression:"form.groupList"}},e._l(e.groupLists,(function(l){return t("el-checkbox",{key:l,attrs:{label:l,name:"groupList"}},[e._v(e._s(l))])})),1)],1),t("el-form-item",{attrs:{label:"成员"}},e._l(e.form.userList,(function(l,a){return t("div",{key:a,staticClass:"flex-row"},[t("el-form-item",{attrs:{prop:`userList.${a}.userName`,rules:e.rules.member.userName}},[t("el-input",{attrs:{placeholder:"请输入姓名"},model:{value:l.userName,callback:function(t){e.$set(l,"userName",t)},expression:"item.userName"}})],1),t("el-form-item",{attrs:{prop:`userList.${a}.uniportalId`,rules:e.rules.member.uniportalId}},[t("el-input",{attrs:{placeholder:"请输入工号"},model:{value:l.uniportalId,callback:function(t){e.$set(l,"uniportalId",t)},expression:"item.uniportalId"}})],1),t("el-form-item",{attrs:{prop:`userList.${a}.telephone`,rules:e.rules.member.telephone}},[t("el-input",{attrs:{placeholder:"请输入电话"},model:{value:l.telephone,callback:function(t){e.$set(l,"telephone",t)},expression:"item.telephone"}})],1),t("el-form-item",{attrs:{prop:`userList.${a}.email`,rules:e.rules.member.email}},[t("el-input",{staticClass:"last-input",attrs:{placeholder:"请输入邮箱"},model:{value:l.email,callback:function(t){e.$set(l,"email",t)},expression:"item.email"}})],1),t("div",{staticClass:"el-icon"},[e.form.userList.length>1?t("i",{staticClass:"el-icon-remove-outline",on:{click:function(t){return e.deleteMember(a)}}}):e._e(),t("i",{staticClass:"el-icon-circle-plus-outline",on:{click:e.addMember}})])],1)})),0)],1),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{attrs:{type:"primary"},on:{click:e.addAccount}},[e._v("确 定")]),t("el-button",{on:{click:e.handleCancel}},[e._v("取 消")])],1)],1)},n=[],c=l(6265),d=l.n(c);const u={getUserList(e){const t="/rest/v1/manager/user-list";return d().post(t,e)},addAccount(e){const t="/rest/v1/manager/add-user";return d().post(t,e)},deleteAccount(e){const t="/rest/v1/manager/delete-user";return d().post(t,e)},editAccount(e){const t="/rest/v1/manager/update-user";return d().post(t,e)}};var h=l(9691);l(1703);const p={phoneValidate(e,t,l){const a=/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;t=void 0===t?"":t.trim(),t.length<=0?l(new Error("手机号码不能为空")):a.test(t)?l():l(new Error("请输入正确的手机号码"))},emailValidate(e,t,l){const a=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;t=void 0===t?"":t.trim(),t.length<=0?l(new Error("邮箱不能为空")):a.test(t)?l():l(new Error("请输入正确的邮箱"))},nameValidate(e,t,l){var a=/^[\u4e00-\u9fa5]{2,4}$/;t=void 0===t?"":t.trim(),t.length<=0?l(new Error("姓名不能为空")):a.test(t)?l():l(new Error("姓名只能为2-4中文！"))}};var f={name:"Dialog",props:["editData"],data(){return{groupLists:["商业软件","整机与板卡","openEuler商业发行版"],form:{testOrganization:"",labManager:"",groupList:[],userList:[{userName:"",uniportalId:"",telephone:"",email:""}]},rules:{testOrganization:[{required:!0,message:"请选择",trigger:"change"}],labManager:[{required:!0,message:"请选择",trigger:"change"}],groupList:[{type:"array",required:!0,message:"请选择",trigger:"change"}],member:{userName:[{required:!0,validator:p.nameValidate,trigger:"blur"}],uniportalId:[{required:!0,message:"请输入工号",trigger:"blur"}],telephone:[{required:!0,validator:p.phoneValidate,trigger:"blur"}],email:[{required:!0,validator:p.emailValidate,trigger:"blur"}]}},testOptions:[{label:"创新中心旗舰店",value:"创新中心旗舰店"}]}},created(){this.editData.length&&(this.form={testOrganization:this.editData.testOrganization,labManager:this.editData.roleDesc,groupList:this.editData.groupList,userList:[{userName:this.editData.userName,uniportalId:this.editData.uniportalId,telephone:this.editData.telephone,email:this.editData.email}]})},watch:{editData:{handler(e){e.length&&(this.form={testOrganization:e.testOrganization,labManager:e.roleDesc,groupList:e.groupList,userList:[{userName:e.userName,uniportalId:e.uniportalId,telephone:e.telephone,email:e.email}]})},deep:!0}},methods:{handleGroupChange(e){},addMember(){this.form.userList.push({userName:"",uniportalId:"",telephone:"",email:""})},deleteMember(e){this.form.userList.splice(e,1)},addAccount(){let e={testOrganization:this.form.testOrganization,projectSupporter:"项目支撑人员"===this.form.labManager,labManager:"实验室管理员"===this.form.labManager,isvSupporter:!1,ihvSupporter:!1,osvSupporter:!1,userList:this.form.userList};this.form.groupList.forEach((t=>{"商业软件"===t?e.isvSupporter=!0:"整机与板卡"===t?e.ihvSupporter=!0:"openEuler商业发行版"===t&&(e.osvSupporter=!0)})),this.$refs["form"].validate((t=>{t&&(this.editData.id?this.changAccountInfo(e):this.addAccountInfo(e))}))},addAccountInfo(e){u.addAccount(e).then((e=>{e.data.code===this.$statusCode.LOGIN_FAILED?(0,h.K)():e.data.code===this.$statusCode.SUCCESS?(this.$message({message:"账号添加成功",type:"success"}),this.handleCancel()):e.data.code===this.$statusCode.REQUEST_FAILED&&this.$message({message:e.data.msg,type:"error"})}))},changAccountInfo(e){u.editAccount(e).then((e=>{e.data.code===this.$statusCode.LOGIN_FAILED?(0,h.K)():e.data.code===this.$statusCode.SUCCESS?(this.$message({message:"账号修改成功",type:"success"}),this.handleCancel()):e.data.code===this.$statusCode.REQUEST_FAILED&&this.$message({message:e.data.msg,type:"error"})}))},handleCancel(){this.form={testOrganization:"",labManager:"",groupList:[],userList:[{userName:"",uniportalId:"",telephone:"",email:""}]},this.$refs["form"].resetFields(),setTimeout((()=>{this.$emit("cancel",!1)}),100)}}},g=f,m=l(1001),b=(0,m.Z)(g,o,n,!1,null,"695aaba9",null),v=b.exports,S={name:"AccountMaintenance",components:{FilterTable:r.Z,FilterHeader:s.Z,Dialog:v},data(){return{keyword:"",clearShow:!1,dialogVisible:!1,tableData:[],editData:[],headerLabel:[{label:"姓名",value:"姓名",disabled:!0},{label:"工号",value:"工号",disabled:!1},{label:"测试机构",value:"测试机构",disabled:!1},{label:"角色",value:"角色",disabled:!1},{label:"群组",value:"群组",disabled:!1},{label:"电话",value:"电话",disabled:!1},{label:"邮箱",value:"邮箱",disabled:!1},{label:"操作",value:"操作",disabled:!1}],headerInit:["姓名","工号","测试机构","角色","群组","电话","邮箱","操作"],headerSelected:["姓名","工号","测试机构","角色","群组","电话","邮箱","操作"],filters:{testOrganization:[],role:[],email:[]},filterSelected:{testOrganization:[],role:[],group:[]},chooseList:[],multipleSelection:[],pagination:{total:0,currentPage:1,layout:"total, size, prev, pager, next, jumper",pageSizes:[10,20,30,50],pageSize:10},params:{pageNo:1,pageSize:10,keyword:"",testOrganizations:[],roles:[],groups:[]}}},created(){this.filters.role=[{value:"任务1",label:"任务1"},{value:"任务2",label:"任务2"}],this.filters.group=[{value:"型号1",label:"型号1"},{value:"型号2",label:"型号2"}],this.filters.testOrganization=[{value:"OS1",label:"OS1"},{value:"OS2",label:"OS2"}],this.getUserList()},methods:{handleSizeChange(e){this.params.pageSize=e,this.pagination.pageSize=e,this.getUserList()},handleCurrentChange(){this.params.pageNo=val,this.pagination.currentPage=val,this.getUserList()},getUserList(){u.getUserList(this.params).then((e=>{e.data.code===this.$statusCode.LOGIN_FAILED?(0,h.K)():e.data.code===this.$statusCode.SUCCESS&&(this.tableData=e.data.body.list[0],this.pagination.total=e.data.body.total)}))},handleSelectionChange(e){this.multipleSelection=e},handleDelete(e){let t=[];console.log(e),e&&t.push(e),this.multipleSelection.length>0&&(t=[],this.multipleSelection.forEach((e=>{t.push(e.id)}))),this.$confirm("账号删除后将不可恢复，确定删除所选账号？","确认删除",{confirmButtonText:"确定",cancelButtonText:"取消"}).then((()=>{u.deleteAccount(t).then((e=>{e.data.code===this.$statusCode.LOGIN_FAILED?(0,h.K)():e.data.code===this.$statusCode.SUCCESS?(this.$message({type:"success",message:"删除成功!",showClose:!0}),this.getUserList()):this.$message({type:"error",message:e.data.msg,showClose:!0})}))}))},handleEdit(e){this.editData=e||[],console.log(this.editData),this.dialogVisible=!0},filterHeader(e){this.headerSelected=e},filterChange(e){if(this.chooseList=this.chooseList.filter((t=>-1===Object.keys(e)[0].indexOf(t.key))),e.testOrganization){if(e.testOrganization.length>0){let t=this.handleFilter(e,"testOrganization");this.chooseList.push(t)}this.filterSelected.testOrganization=e.testOrganization}if(e.role){if(e.role.length>0){let t=this.handleFilter(e,"role");this.chooseList.push(t)}this.filterSelected.role=e.role}if(e.group){if(e.group.length>0){let t=this.handleFilter(e,"group");this.chooseList.push(t)}this.filterSelected.group=e.group}},handleFilter(e,t){let l="";"testOrganization"===t?l="测试机构：":"role"===t?l="角色：":"group"===t&&(l="群组："),e[t].forEach(((a,i)=>{l+=a,i<e[t].length-1&&(l+=", ")}));let a={key:t,value:l};return a},handleClose(e){this.chooseList=this.chooseList.filter((t=>t.key!==e.key)),this.filterSelected[e.key]=[]},clearAll(){this.chooseList=[],this.filterSelected={testOrganization:[],role:[],group:[]}},searchData(e){this.params.keyword=e.trim(),this.getUserList()},clearKeyword(){this.keyword="",this.params.keyword="",this.getUserList()},cancel(e){this.dialogVisible=e,this.getUserList()}}},L=S,C=(0,m.Z)(L,a,i,!1,null,"14d09e76",null),w=C.exports},9691:function(e,t,l){l.d(t,{K:function(){return r}});var a=l(8499),i=l(1120);function r(){a.MessageBox.confirm("当前登录超时，请重新登录!","会话过期",{confirmButtonText:"确定",showCancelButton:!1,closeOnClickModal:!1,closeOnPressEscape:!1,showClose:!1}).then((()=>{i.Z.push("/login")})).catch((()=>{}))}},5719:function(e,t,l){e.exports=l.p+"img/noData.cac85dd7.svg"},2498:function(e,t,l){e.exports=l.p+"img/clear.cb0adf9a.svg"},2113:function(e,t,l){e.exports=l.p+"img/screen1.c79c490f.svg"},3341:function(e,t,l){e.exports=l.p+"img/screen3.32156a36.svg"}}]);
//# sourceMappingURL=916.7a554d76.js.map