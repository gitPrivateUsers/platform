$(function () {
    $("#jqGrid").jqGrid({
        url: '../newscomment/list',
        datatype: "json",
        colModel: [
			{label: 'id', name: 'id', index: 'id', key: true, hidden: true},
			{label: '新闻id', name: 'newsId', index: 'news_id', width: 80,align:'center'},
			{label: '评论内容', name: 'commentDetails', index: 'comment_details', width: 80},
			{label: '评论时间', name: 'commentTime', index: 'comment_time', width: 80,align:'center'},
			{label: '用户的ip地址', name: 'commentIp', index: 'comment_ip', width: 80,align:'center',hidden: true},
			{label: '用户id', name: 'commentUid', index: 'comment_uid', width: 80,align:'center',hidden: true},
			{label: '匿名信息', name: 'anonymityInfo', index: 'anonymity_info', width: 80,align:'center'},
			{label: '标识索引备注', name: 'identify', index: 'identify', width: 80,align:'center',hidden: true}
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

//var vm = new Vue({
let vm = new Vue({
	el: '#rrapp',
	data: {
        showList: true,
        title: null,
		newsComment: {},
		ruleValidate: {
			name: [
				{required: true, message: '名称不能为空', trigger: 'blur'}
			],
			commentDetails: [
				{required: true, message: '评论内容不能为空',trigger: 'blur'}
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
			vm.newsComment = {
				anonymityInfo:1
			};
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
			//var url = vm.newsComment.id == null ? "../newscomment/save" : "../newscomment/update";
			let url = vm.newsComment.id == null ? "../newscomment/save" : "../newscomment/update";
			$.ajax({
				type: "POST",
			    url: url,
			    contentType: "application/json",
			    data: JSON.stringify(vm.newsComment),
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
				    url: "../newscomment/delete",
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
			$.get("../newscomment/info/"+id, function (r) {
                vm.newsComment = r.newsComment;
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