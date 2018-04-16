$(function () {
    $("#jqGrid").jqGrid({
        url: '../newsmessage/list',
        datatype: "json",
        colModel: [
            {label: 'id', name: 'id', index: 'id', key: true, hidden: true},
            {label: '新闻标题', name: 'title', index: 'title', width: 80,align:'center'},
            {label: '新闻内容', name: 'details', index: 'details', width: 80,align:'center'},
            {label: '新闻作者', name: 'author', index: 'author', width: 80,align:'center'},
            {
                label: '发布日期', name: 'releaseDate', index: 'release_date', width: 80,align:'center',formatter:function(value){
                return transDate(value, 'yyyy-MM-dd hh:mm:ss');
            }
            },
            {label: '新闻类型', name: 'typeName', index: 'type_id', width: 80,align:'center'},
            {label: '点击量', name: 'clickRate', index: 'click_rate', width: 80,align:'center'},
            {
                label: '是否头条', name: 'showTop', index: 'show_top', width: 80,align:'center',formatter:function(value){
                return transIsNot(value);
            }
            },
            {
                label: '是否热点', name: 'showHot', index: 'show_hot', width: 80,align:'center',formatter:function(value) {
                return transIsNot(value);
            }
            },
            {
                label: '新闻图片', name: 'newsImageUrl', index: 'news_image_url', width: 80,align:'center',formatter:function(value){
                return transImg(value);
            }
            },
            {
                label: '更新时间', name: 'updateTime', index: 'update_time', width: 80,align:'center',formatter:function(value){
                return transDate(value, 'yyyy-MM-dd hh:mm:ss');
            }
            },
            {label: '更新者', name: 'updateBy', index: 'update_by', width: 80,align:'center'},
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
    $("#newsDesc").editable({
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
//函数引入
function transIsNot(value) {
    if (value == 1) {
        return '<span class="badge badge-info">是</span>';
    }
    return '<span class="badge badge-danger">否</span>';
};

/**
 * 翻译图片
 * @param url
 * @returns {*}
 */
function transImg(url) {
    if (url) {
        return '<img width="50px" height="50px" src="' + url + '">';
    } else {
        return '-';
    }
};
/**
 * 翻译日期
 * @param date
 * @param fmt
 * @returns {*}
 */
function transDate(date, fmt) {
    if (date) {
        if (typeof date == 'number') {
            return new Date(date).dateFormat(fmt);
        } else {
            try {
                return new Date(date.replace('-', '/').replace('-', '/')).dateFormat(fmt);
            } catch (e) {
                return '-';
            }
        }
    } else {
        return '-';
    }
};

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
            releaseDate:'',
            typeId: '',
            details: ''

        },
        newsTypes:[],
        ruleValidate: {
            title: [
                {required: true, message: '新闻标题不能为空', trigger: 'blur'}
            ],
            releaseDate: [
                {required: true, type: 'datetime',message: '请选择发布日期', trigger: 'blur'}
            ],
            typeId: [
                {required: true, message: '新闻类型不能为空', trigger: 'blur'}
            ]
          /*  ,
            details:[
                {required: true, message: '新闻内容不能为空', trigger: 'blur'},
                {type: 'string', min: 20, message: '内容不能少于20字', trigger: 'blur'}
            ]*/
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
            //vm.uploadList = [];
            vm.newsMessage = {
                newsImageUrl: '',
                showTop: 1,
                showHot: 1,
                typeId: '',
                typeName: '',
                details: ''
            };
            $("#newsDesc").editable('setHTML', '');
            vm.newsTypes = [];
            vm.getNewsTypes();
        },
        update: function (event) {
            var id = getSelectedRow();
            //let id = getSelectedRow();
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
            //debugger
            vm.newsMessage.details = $("#newsDesc").editable('getHTML');
            //console.log(vm.newsMessage.details);
            //console.log(vm.newsMessage);
            //console.log(JSON.stringify(vm.newsMessage));
            //console.log(JSON.stringify(vm.newsMessage.details));
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
            //let ids = getSelectedRows();
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
                $('#newsDesc').editable('setHTML', vm.newsMessage.details);
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