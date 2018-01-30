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
            {label: '新闻类型', name: 'typeName', index: 'type_id', width: 80},
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
            {
                label: '新闻图片', name: 'newsImageUrl', index: 'news_image_url', width: 80,formatter:function(value){
                return transImg(value);
            }
            },
            {
                label: '更新时间', name: 'updateTime', index: 'update_time', width: 80,formatter:function(value){
                return transDate(value);
            }
            },
            {label: '更新者', name: 'updateBy', index: 'update_by', width: 80},
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
    $('#newsMessage').editable({
        inlineMode: false,
        alwaysBlank: true,
        height: '450px', //高度
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
var ztree;
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
        visible: false,
        newsMessage: {
            listPicUrl: '',
        },
        newsTypes:[],
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
            vm.uploadList = [];
            vm.newsMessage = {
                newsImageUrl:'',
                showTop:1,
                showHot:1,
                typeId:'',
                deteils:[],
            };
            vm.getNewsTypes();
            $('#newsMessage').editable('setHTML', '');

        },
        update: function (event) {
            let id = getSelectedRow();
            if (id == null) {
                return;
            }
            vm.showList = false;
            vm.title = "修改";
            vm.uploadList = [];
            vm.getInfo(id);

            vm.getNewsTypes();
        },
        saveOrUpdate: function (event) {
            var url = vm.newsMessage.id == null ? "../newsmessage/save" : "../newsmessage/update";
        let str = $('#newsMessage').editable('getHTML');
            vm.newsMessage.details=str;
            console.log(str);
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
                $('#newsMessage').editable('setHTML', vm.newsMessage.details);
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
        handleSuccess(res, file) {
            // 因为上传过程为实例，这里模拟添加 url
            file.imgUrl = res.url;
            file.name = res.url;
            vm.uploadList.add(file);
        },
        handleBeforeUpload() {
            const check = this.uploadList.length < 5;
            if (!check) {
                this.$Notice.warning({
                    title: '最多只能上传 5 张图片。'
                });
            }
            return check;
        },
        handleSuccessNewsImageUrl: function (res, file) {
            vm.newsMessage.newsImageUrl = file.response.url;
        },
        eyeNewsImageUrl: function () {
            var url = vm.newsMessage.newsImageUrl;
            eyeImage(url);
        }
    }
});