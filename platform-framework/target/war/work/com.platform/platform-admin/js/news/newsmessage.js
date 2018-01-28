$(function () {
    $("#jqGrid").jqGrid({
        url: '../newsmessage/list',
        datatype: "json",
        colModel: [
            {label: 'id', name: 'id', index: 'id', key: true, hidden: true},
            {label: '新闻标题', name: 'title', index: 'title', width: 80},
            {label: '新闻内容', name: 'details', index: 'details', width: 80},
            {label: '新闻作者', name: 'author', index: 'author', width: 80},
            {
                label: '发布日期', name: 'releaseDate', index: 'release_date', width: 80,formatter:function(value){
                return transDate(value);
            }
            },
            {label: '类型id', name: 'typeId', index: 'type_id', width: 80},
            {label: '点击量', name: 'clickRate', index: 'click_rate', width: 80},
            {
                label: '是否头条', name: 'showTop', index: 'show_top', width: 80,formatter:function(value){
                return transIsNot(value);
            }
            },
            {
                label: '是否热点', name: 'showHot', index: 'show_hot', width: 80,formatter:function(value) {
                return transIsNot(value);
            }
            },
            {label: '新闻图片url', name: 'newsImageUrl', index: 'news_image_url', width: 80},
            //{label: '最后评论者id', name: 'lastCommentId', index: 'last_comment_id', width: 80},
            //{
            //	label: '最后评论时间', name: 'lastCommentTime', index: 'last_comment_time', width: 80,formatter:function(value){
            //		return transDate(value);
            //	}
            //},
            //{label: '评论次数', name: 'commentCount', index: 'comment_count', width: 80},
            {
                label: '更新时间', name: 'updateTime', index: 'update_time', width: 80,formatter:function(value){
                return transDate(value);
            }
            },
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
    $('#details').editable({
        inlineMode: false,
        alwaysBlank: true,
        height: '500px', //高度
        minHeight: '200px',
        language: "zh_cn",
        spellcheck: false,
        plainPaste: true,
        enableScript: false,
        imageButtons: ["floatImageLeft", "floatImageNone", "floatImageRight", "linkImage", "replaceImage", "removeImage"],
        allowedImageTypes: ["jpeg", "jpg", "png", "gif"],
        imageUploadURL: '../sys/oss/upload',
        imageUploadParams: {id: "edit"},
        imagesLoadURL: '../sys/oss/queryAll'
    })
});

var setting = {
    data: {
        simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "parentId",
            rootPId: -1
        },
        key: {
            url: "nourl"
        }
    }
};
var vm = new Vue({
    el: '#rrapp',
    data: {
        showList: true,
        title: null,
        uploadList: [],
        imgName: '',
        visible: false,
        newsMessage: {},
        newsTypes:{},
        //news: {
        //    listPicUrl: '',
        //    isOnSale: 1,
        //    isNew: 1,
        //    isAppExclusive: 0,
        //    isLimited: 0,
        //    isHot: 0,
        //    categoryName: ''
        //},
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
           // vm.uploadList = [];
            vm.newsMessage = {showTop:'1',showHot:'1'};
            vm.newsTypes = {};

            $('#details').editable('setHTML', '');

            this.getNewsTypes();
        },
        update: function (event) {
            var id = getSelectedRow();
            if (id == null) {
                return;
            }
            vm.showList = false;
            vm.title = "修改";
            //vm.uploadList = [];
            vm.getInfo(id);

            this.getNewsTypes();
        },
        saveOrUpdate: function (event) {
            var url = vm.newsMessage.id == null ? "../newsmessage/save" : "../newsmessage/update";
            vm.newsMessage.details = $('#details').editable('getHTML');
            //vm.newsMessage.goodsImgList = vm.uploadList;
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
            var ids = getSelectedRows();
            if (ids == null) {
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
        getInfo: function (id) {
            $.get("../newsmessage/info/" + id, function (r) {
                vm.newsMessage = r.newsMessage;
                $('#details').editable('setHTML', vm.newsMessage.details);
            });
        },
        /**
         * 获取新闻类型列表
         */
        getNewsTypes: function () {
            $.get("../newstype/queryAll", function (r) {
                vm.newsTypes = r.list;
            });
        },
        reload: function (event) {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                postData: {'name': vm.q.name},
                page: page
            }).trigger("reloadGrid");
            vm.handleReset('formValidate');
        },
        //handleView(name) {
        //    this.imgName = name;
        //    this.visible = true;
        //},
        //handleRemove(file) {
        //    // 从 upload 实例删除数据
        //    const fileList = this.uploadList;
        //    this.uploadList.splice(fileList.indexOf(file), 1);
        //},
        //handleSuccess(res, file) {
        //    // 因为上传过程为实例，这里模拟添加 url
        //    file.imgUrl = res.url;
        //    file.name = res.url;
        //    vm.uploadList.add(file);
        //},
        //handleBeforeUpload() {
        //    const check = this.uploadList.length < 5;
        //    if (!check) {
        //        this.$Notice.warning({
        //            title: '最多只能上传 5 张图片。'
        //        });
        //    }
        //    return check;
        //},
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
            vm.newsMessage.primaryPicUrl = file.response.url;
        },
        //handleSuccessListPicUrl: function (res, file) {
        //    vm.newsMessage.listPicUrl = file.response.url;
        //},
        eyeImagePicUrl: function () {
            var url = vm.newsMessage.primaryPicUrl;
            eyeImage(url);
        },
        //eyeImageListPicUrl: function () {
        //    var url = vm.newsMessage.listPicUrl;
        //    eyeImage(url);
        //},
        //eyeImage: function (e) {
        //    eyeImage($(e.target).attr('src'));
        //}
    }
    //mounted() {
    //    this.uploadList = this.$refs.upload.fileList;
    //}
});