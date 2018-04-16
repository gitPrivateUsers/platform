$(function () {
    $("#jqGrid").jqGrid({
        url: '../goodsgallery/list',
        datatype: "json",
        colModel: [
			{label: 'id', name: 'id', index: 'id', key: true, hidden: true},
			{label: '商品名称', name: 'goodsName', index: 'goods_id', width: 80,align:'center'},
			{label: '图片', name: 'imgUrl', index: 'img_url', width: 80,align:'center'},
			{label: '描述', name: 'imgDesc', index: 'img_desc', width: 80},
			{label: '排序', name: 'sortOrder', index: 'sort_order', width: 80,align:'center'}],
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
		goodsGallery: {
			imgUrl:''
		},
		ruleValidate: {
			goodsName: [
				{required: true, message: '商品名称不能为空', trigger: 'blur'}
			],
			imgUrl: [
				{required: true, message: '图片地址不能为空', trigger: 'blur'}
			]
		},
		q: {
			goodsName: ''
		},
		goodss: [],
	},
	methods: {
		getGoodss: function () {
			$.get("../goods/queryAll/", function (r) {
				vm.goodss = r.list;
			});
		},
		query: function () {
			vm.reload();
		},
		add: function () {
			vm.showList = false;
			vm.title = "上传";
			vm.goodsGallery = {
				imgUrl:''
			};
			vm.getGoodss();
		},
		update: function (event) {
            let id = getSelectedRow();
			if (id == null) {
				return;
			}
			vm.showList = false;
            vm.title = "修改";
			vm.getGoodss();
            vm.getInfo(id)
		},
		saveOrUpdate: function (event) {
            let url = vm.goodsGallery.id == null ? "../goodsgallery/save" : "../goodsgallery/update";
			$.ajax({
				type: "POST",
			    url: url,
			    contentType: "application/json",
			    data: JSON.stringify(vm.goodsGallery),
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
				    url: "../goodsgallery/delete",
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
			$.get("../goodsgallery/info/"+id, function (r) {
                vm.goodsGallery = r.goodsGallery;
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
		handleFormatError: function (file) {
			this.$Notice.warning({
				title: '文件格式不正确',
				desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
			});
		},
		handleMaxSize: function (file) {
			this.$Notice.warning({
				title: '超出文件大小限制',
				desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
			});
		},
        handleReset: function (name) {
            handleResetForm(this, name);
        },
		handleSuccessPicUrl: function (res, file) {
			vm.goodsGallery.imgUrl = file.response.url;
		},
		eyeImagePicUrl: function () {
			var url = vm.goodsGallery.imgUrl;
			eyeImage(url);
		},
		eyeImage: function (e) {
			eyeImage($(e.target).attr('src'));
		}
	}
});