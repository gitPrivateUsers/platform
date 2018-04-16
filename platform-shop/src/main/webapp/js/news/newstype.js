$(function () {
    $("#jqGrid").jqGrid({
        url: '../newstype/list',
        datatype: "json",
        colModel: [
			{label: 'id', name: 'id', index: 'id', key: true, hidden: true},
			{label: '类型名称', name: 'typeName', index: 'type_name', width: 80,align:'center'},
			{label: '上一级类型id', name: 'superiorId', index: 'superior_id', width: 80,align:'center'},
			{label: '层级id', name: 'tierId', index: 'tier_id', width: 80,align:'center'},
			{label: '排序索引', name: 'sortIndex', index: 'sort_index', width: 80,align:'center'},
			{label: '备注', name: 'remark', index: 'remark', width: 80,align:'center'}],
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
//var vm = new Vue({
let vm = new Vue({
	el: '#rrapp',
	data: {
        showList: true,
        title: null,
		newsType: {},
		ruleValidate: {
			typeName: [
				{required: true, message: '类型名称不能为空', trigger: 'blur'}
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
			vm.newsType = {};
		},
		update: function (event) {
			//var id = getSelectedRow();
            let id = getSelectedRow();
			if (id == null) {
				return;
			}
			vm.showList = false;
            vm.title = "修改";

            vm.getInfo(id)
		},
		saveOrUpdate: function (event) {
			//var url = vm.newsType.id == null ? "../newstype/save" : "../newstype/update";
            let url = vm.newsType.id == null ? "../newstype/save" : "../newstype/update";
			$.ajax({
				type: "POST",
			    url: url,
			    contentType: "application/json",
			    data: JSON.stringify(vm.newsType),
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
			//var ids = getSelectedRows();
            let ids = getSelectedRows();
			if (ids == null){
				return;
			}

			confirm('确定要删除选中的记录？', function () {
				$.ajax({
					type: "POST",
				    url: "../newstype/delete",
				    contentType: "application/json",
				    data: JSON.stringify(ids),
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
		getInfo: function(id){
			$.get("../newstype/info/"+id, function (r) {
                vm.newsType = r.newsType;
            });
		},
		reload: function (event) {
			vm.showList = true;
			//var page = $("#jqGrid").jqGrid('getGridParam', 'page');
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