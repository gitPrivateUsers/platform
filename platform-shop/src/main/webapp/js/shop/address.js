$(function () {
    let userId = getQueryString("userId");
    let url = '../address/list';
    //var userId = getQueryString("userId");
    //var url = '../address/list';
    if (userId) {
        url += '?userId=' + userId;
    }
    $("#jqGrid").jqGrid({
        //url: url,
        url:'../address/list',
        datatype: "json",
        colModel: [
            {label: 'id', name: 'id', index: 'id', key: true, hidden: true},
            {label: '会员', name: 'shopUserName', index: 'user_id', width: 90,align:'center'},
            {label: '收货人姓名', name: 'userName', index: 'user_name', width: 80,align:'center'},
            {label: '手机', name: 'telNumber', index: 'tel_number', width: 80,align:'center'},
            {label: '收货地址国家码', name: 'nationalCode', index: 'national_Code', width: 80,align:'center',hidden:true},
            {label: '省', name: 'provinceName', index: 'province_Name', width: 80,align:'center'},
            {label: '市', name: 'cityName', index: 'city_Name', width: 80,align:'center'},
            {label: '区', name: 'countyName', index: 'county_Name', width: 80,align:'center'},
            {label: '详细收货地址信息', name: 'detailInfo', index: 'detail_Info', width: 150},
            {label: '邮编', name: 'postalCode', index: 'postal_Code', width: 80,align:'center'},
            {
                label: '是否为默认地址', name: 'isDefault', width: 80,align:'center',formatter: function (value) {
                return value === 0 ?
                    '<span class="badge badge-danger">否</span>' :
                    '<span class="badge badge-info">是</span>';
            }
            },
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
            //隐藏grid底部滚动条
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });
});

//验证手机号码开始
//var validPhone=(rule, value,callback)=>{
//    if (!value){
//        callback(new Error('电话号码不能为空'))
//    }else  if (!isvalidPhone(value)){
//        callback(new Error('请输入正确的11位手机号码'))
//    }else {
//        callback()
//    }
//}
//
//function isvalidPhone(str) {
//    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
//    return reg.test(str)
//}
//,validator:validPhone
//验证手机号码结束

var vm = new Vue({
    el: '#rrapp',
    data: {
        showList: true,
        title: '修改地址信息',
        address: {},
        ruleValidate: {
            userName: [
                {required: true, message: '收货人姓名不能为空', trigger: 'blur'}
            ],
            telNumber: [
                {required: true, message: '手机号码不能为空', trigger: 'blur'},
                {pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '请输入正确的11位手机号码'}
            ],
            detailInfo: [
                {required: true, message: '详细收货地址不能为空', trigger: 'blur'}
            ]
        },
        q: {
            userName: '',
            telNumber: ''
        }
    },
    methods: {
        query: function () {
            vm.reload();
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
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.address = {};
        },
        update: function (event) {
            var id = getSelectedRow();
            if (id == null) {
                return;
            }
            vm.showList = false;
            vm.title = "修改";
            vm.getInfo(id);
           // vm.q.userName;
        },
        saveOrUpdate: function (event) {
            var url = vm.address.id == null ? "../address/save" : "../address/update";
            $.ajax({
                type: "POST",
                url: url,
                contentType: "application/json",
                data: JSON.stringify(vm.address),
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
        getInfo: function (id) {
            $.get("../address/info/" + id, function (r) {
                vm.address = r.address;
            });
        },
        handleSubmit: function (name) {
            handleSubmitValidate(this, name, function () {
                vm.saveOrUpdate()
            });
        },
        handleReset: function (name) {
            handleResetForm(this, name);
        },
        del: function (event) {
            var ids = getSelectedRows();
            if (ids == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: "../address/delete",
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
        }
    }
});