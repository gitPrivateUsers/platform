$(function () {
    $("#jqGrid").jqGrid({
        url: '../storeconfigure/list',
        datatype: "json",
        colModel: [
			{label: 'storeId', name: 'storeId', index: 'store_id', key: true, hidden: true},
			{label: '店铺名称（一般为部门一级名称）', name: 'storeName', index: 'store_name', width: 80},
			{label: '存放部门（店铺/公司）一级ID', name: 'deptParentId', index: 'dept_parent_id', width: 80},
			{label: '小程序APPID', name: 'appId', index: 'app_id', width: 80},
			{label: '小程序AppSecret', name: 'appSecret', index: 'app_secret', width: 80},
			{label: '微信支付商户号', name: 'muchId', index: 'much_Id', width: 80},
			{label: '微信支付秘钥', name: 'paySingKey', index: 'pay_sing_key', width: 80},
			{label: '状态 （0 营业   1 休息  2 冻结 ）', name: 'status', index: 'status', width: 80},
			{label: '逻辑删除（0 正常  1 删除）', name: 'isDelete', index: 'is_delete', width: 80},
			{label: '创建者', name: 'createBy', index: 'create_by', width: 80},
			{label: '创建时间', name: 'createTime', index: 'create_time', width: 80},
			{label: '更新者', name: 'updateBy', index: 'update_by', width: 80},
			{label: '更新时间', name: 'updateTime', index: 'update_time', width: 80},
			{label: '备注', name: 'remark', index: 'remark', width: 80}],
		viewrecords: true,
        height: 385,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader: {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order"
        },
        gridComplete: function () {
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });
});

let vm = new Vue({
	el: '#rrapp',
	data: {
        showList: true,
        title: null,
		storeConfigure: {},
		ruleValidate: {
			name: [
				{required: true, message: '名称不能为空', trigger: 'blur'}
			]
		},
		q: {
		    name: ''
		}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function () {
			vm.showList = false;
			vm.title = "新增";
			vm.storeConfigure = {};
		},
		update: function (event) {
            let storeId = getSelectedRow();
			if (storeId == null) {
				return;
			}
			vm.showList = false;
            vm.title = "修改";

            vm.getInfo(storeId)
		},
		saveOrUpdate: function (event) {
            let url = vm.storeConfigure.storeId == null ? "../storeconfigure/save" : "../storeconfigure/update";
			$.ajax({
				type: "POST",
			    url: url,
			    contentType: "application/json",
			    data: JSON.stringify(vm.storeConfigure),
                success: function (r) {
                    if (r.code === 0) {
                        alert('操作成功', function (index) {
                            vm.reload();
                        });
                    } else {
                        alert(r.msg);
                    }
                }
			});
		},
		del: function (event) {
            let storeIds = getSelectedRows();
			if (storeIds == null){
				return;
			}

			confirm('确定要删除选中的记录？', function () {
				$.ajax({
					type: "POST",
				    url: "../storeconfigure/delete",
				    contentType: "application/json",
				    data: JSON.stringify(storeIds),
				    success: function (r) {
						if (r.code == 0) {
							alert('操作成功', function (index) {
								$("#jqGrid").trigger("reloadGrid");
							});
						} else {
							alert(r.msg);
						}
					}
				});
			});
		},
		getInfo: function(storeId){
			$.get("../storeconfigure/info/"+storeId, function (r) {
                vm.storeConfigure = r.storeConfigure;
            });
		},
		reload: function (event) {
			vm.showList = true;
            let page = $("#jqGrid").jqGrid('getGridParam', 'page');
			$("#jqGrid").jqGrid('setGridParam', {
                postData: {'name': vm.q.name},
                page: page
            }).trigger("reloadGrid");
            vm.handleReset('formValidate');
		},
        handleSubmit: function (name) {
            handleSubmitValidate(this, name, function () {
                vm.saveOrUpdate()
            });
        },
        handleReset: function (name) {
            handleResetForm(this, name);
        }
	}
});