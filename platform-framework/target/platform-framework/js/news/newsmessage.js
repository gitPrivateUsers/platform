$(function () {
    $("#jqGrid").jqGrid({
        url: '../newsmessage/list',
        datatype: "json",
        colModel: [
			{label: 'id', name: 'id', index: 'id', key: true, hidden: true},
			{label: '新闻标题', name: 'title', index: 'title', width: 80},
			{label: '新闻内容', name: 'details', index: 'details', width: 80},
			{label: '新闻作者', name: 'author', index: 'author', width: 80},
			{label: '发布日期', name: 'releaseDate', index: 'release_date', width: 80},
			{label: '类型id', name: 'typeId', index: 'type_id', width: 80},
			{label: '点击量', name: 'clickRate', index: 'click_rate', width: 80},
			{label: '是否头条：0否，1是', name: 'showTop', index: 'show_top', width: 80},
			{label: '是否热点：0否，1是', name: 'showHot', index: 'show_hot', width: 80},
			{label: '新闻图片url', name: 'newsImageUrl', index: 'news_image_url', width: 80},
			{label: '最后评论者id', name: 'lastCommentId', index: 'last_comment_id', width: 80},
			{label: '最后评论时间', name: 'lastCommentTime', index: 'last_comment_time', width: 80},
			{label: '评论次数', name: 'commentCount', index: 'comment_count', width: 80},
			{label: '更新时间', name: 'updateTime', index: 'update_time', width: 80},
			{label: '更新者', name: 'updateBy', index: 'update_by', width: 80},
			//{label: '标识索引备注', name: 'identify', index: 'identify', width: 80}
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
		newsMessage: {},
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
			vm.newsMessage = {};
		},
		update: function (event) {
            let id = getSelectedRow();
			if (id == null) {
				return;
			}
			vm.showList = false;
            vm.title = "修改";

            vm.getInfo(id)
		},
		saveOrUpdate: function (event) {
            let url = vm.newsMessage.id == null ? "../newsmessage/save" : "../newsmessage/update";
			$.ajax({
				type: "POST",
			    url: url,
			    contentType: "application/json",
			    data: JSON.stringify(vm.newsMessage),
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
            let ids = getSelectedRows();
			if (ids == null){
				return;
			}

			confirm('确定要删除选中的记录？', function () {
				$.ajax({
					type: "POST",
				    url: "../newsmessage/delete",
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
			$.get("../newsmessage/info/"+id, function (r) {
                vm.newsMessage = r.newsMessage;
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