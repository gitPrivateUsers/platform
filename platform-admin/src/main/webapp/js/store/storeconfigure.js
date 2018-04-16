$(function () {
    $("#jqGrid").jqGrid({
        url: '../storeconfigure/list',
        datatype: "json",
        colModel: [
			{label: 'storeId', name: 'storeId', index: 'store_id', key: true, hidden: true},
			{label: '店铺名称', name: 'storeName', index: 'store_name', width: 90,align:'center'},
			{label: '所属', name: 'deptParentId', index: 'dept_parent_id', width: 30,align:'center',hidden:true},
			{label: 'APPID', name: 'appId', index: 'app_id', width: 90,align:'center',align:'center'},
			{label: 'AppSecret', name: 'appSecret', index: 'app_secret', width:125,align:'center'},
			{label: '支付商户号', name: 'muchId', index: 'much_Id', width: 50,align:'center'},
			{label: '支付秘钥', name: 'paySingKey', index: 'pay_sing_key', width: 130,align:'center'},
			{label: '状态', name: 'status', index: 'status',width: 30,align:'center', formatter: function (value) {
				if (value == 0) return '<span class="label label-info">营业</span>';
				if (value == 1) return '<span class="label label-danger">休息</span>';
				if (value == 2) return '<span class="label label-warning">冻结</span>';
				}
			},
			{label: '标记', name: 'isDelete', index: 'is_delete', width: 30,align:'center',formatter: function(value){
				return (value === 0) ?
					'<span class="label label-info">正常</span>': '<span class="label label-warning">删除</span>';
				}
			},
			{label: '创建者', name: 'createBy', index: 'create_by', width: 55,align:'center'},
			{label: '创建时间', name: 'createTime', index: 'create_time', width: 85,align:'center',formatter: function (value) {
				return transDate(value);
				}
			},
			{label: '更新者', name: 'updateBy', index: 'update_by', width:55,align:'center'},
			{label: '更新时间', name: 'updateTime', index: 'update_time', width: 85,align:'center',formatter: function (value) {
				return transDate(value);
				}
			},
			{label: '备注', name: 'remark', index: 'remark', width: 80,align:'center',hidden:true}
		],
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
			storeName: [
				{required: true, message: '店铺名称不能为空', trigger: 'blur'}
			],
			deptParentId:[
				{required: true, message: '部门ID不能为空', trigger: 'blur'}
			],
			appId: [
				{required: true, message: 'AppId不能为空', trigger: 'blur'}
			],
			appSecret: [
				{required: true, message: 'AppSecret不能为空', trigger: 'blur'}
			],
			muchId: [
				{required: true, message: '支付商户号不能为空', trigger: 'blur'}
			],
			paySingKey: [
				{required: true, message: '支付秘钥不能为空', trigger: 'blur'}
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
			vm.storeConfigure = {status:'0',isDelete:'0'};
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