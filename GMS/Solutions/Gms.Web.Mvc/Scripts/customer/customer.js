﻿
var Customer;
if (!Customer) {
    Customer = {};
}

Customer.Init = function () {

    var features = 'dialogHeight=800; dialogWidth=1000; center=yes;location=0; resizable=0; status=0';

    $('#customer_search_list').datagridEx({
        toolbar: '#toolbar',
        pagination: true,
        singleSelect:true,
        columns: [[
            { field: 'Name', title: '姓名', width: 100 },
            { field: 'CodeNo', title: '编号', width: 100 },
            { field: 'CustomerGradeString', title: '等级', width: 100 },
            { field: 'AccountName', title: '默认结算账户', width: 100 },
            { field: 'Amount', title: '累计消费金额', width: 100 },
            { field: 'Point', title: '累计积分', width: 100 },
            { field: 'CreateTimeString', title: '开户时间', width: 100 },
            { field: 'Note', title: '备注', width: 100 }
        ]]
    });

    $("#btnAdd").click(function () {

        var vReturnValue = window.showModalDialog('/Customer/Edit', '添加客户', features);
        if (vReturnValue != undefined) {
            $('#customer_search_list').datagridEx("reload");
        }

    });

    $("#btnEdit").click(function () {

        var rec = $('#customer_search_list').datagridEx("getSelected");

        if (rec == null) {
            return;
        }

        var vReturnValue = window.showModalDialog('/Customer/Edit?id=' + rec.Id, '编辑客户信息', features);
        if (vReturnValue != undefined) {
            $('#customer_search_list').datagridEx("reload");
        }

    });

};


Customer.Edit = function () {


    $("#entityform").validate({
        onkeyup: false,
        onfocusout: false,
        rules: {
            CodeNo: "required",
            Name: "required"
        },
        messages: {
            CodeNo: "请输入编号",
            Name: "请输入姓名"
        }
        , showErrors: function (errorMap, errorList) {
            var message = '请完善以下内容后，再提交。\n';
            var errors = "";
            if (errorList.length > 0) {
                for (x = 0; x < errorList.length; x++) {
                    errors += "<br/>\u25CF " + errorList[x].message;
                }

                $.messager.alert("提示", message + errors);
            }

        }

    });

    //----------------------------------------- 选择账户 -------------------------------------//
    $("#selectAccount").live("click", function () {

        $("#selcet_acc_dlg_content").attr("src", "/Account/Select");

        var opt = {
            title: '选择账户',
            width: 680,
            height: 380,
            buttons: [{
                text: '确定',
                iconCls: 'icon-ok',
                handler: function () {
                    var deptContents = $("#selcet_acc_dlg_content").contents();

                    $("#Account_Id").val(deptContents.find("#account_selected_Id").val());
                    $("#Account_Name").val(deptContents.find("#account_selected_Name").val());

                    $("#selcet_acc_dlg").dialog('close');
                }
            }, {
                text: '取消',
                iconCls: 'icon-cancel',
                handler: function () {
                    $("#selcet_acc_dlg").dialog('close');
                }
            }]
        };

        $("#selcet_acc_dlg").show();
        $("#selcet_acc_dlg").dialog(opt);

        return false;

    });

    $("#btnSave2").click(function () {

        var formOptions = {
            defaultbefore: false,
            beforeSubmit: function (arr, $form) {
                var result = $form.valid();
                return result;
            },
            success: function (data) {

                if (data.success) {
                    $.messager.alert('提示', '保存成功', 'info');

                    window.returnValue = "true";
                    window.close();

                } else {
                    $.messager.alert('错误', '保存失败：' + data.data, 'error');
                }
            }
        };

        formOptions.dataType = 'json';

        $('#entityform').submitForm(formOptions);

    });

    $("#btnSave1").click(function () {

        var formOptions = {
            defaultbefore: false,
            beforeSubmit: function (arr, $form) {
                var result = $form.valid();
                return result;
            },
            success: function (data) {

                if (data.success) {
                    $.messager.alert('提示', '保存成功', 'info');
                    window.location = '/Customer/Edit?id=' + data.data.Id;
                } else {
                    $.messager.alert('错误', '保存失败：' + data.data, 'error');
                }
            }
        };

        formOptions.dataType = 'json';

        $('#entityform').submitForm(formOptions);

    });


    $('#tabCustomer').tabs({
        onSelect: function (title, index) {
            var tab = $("#tabCustomer").tabs("getTab", index);

            if (index == 1) {

                var cId = $("#Id").val();

                if (cId > 0) {

                    var src = $("iframe", tab).attr("src");
                    if (src == undefined || src.indexOf("Alert") > 0) {
                        var url = $("iframe", tab).attr("url");
                        $("iframe", tab).attr("src", url);
                    }

                }
            }

        }
       
    });

};


Customer.Select = function () {

    $('#customer_search_list').datagridEx({
        toolbar: '#toolbar',
        pagination: true,
        singleSelect:true,
        columns: [[
            { field: 'Name', title: '姓名', width: 100 },
            { field: 'Mobile', title: '电话', width: 100 },
            { field: 'Company', title: '公司', width: 100 },
            { field: 'Address', title: '地址', width: 100 },
            { field: 'Note', title: '备注', width: 100 }//,
            //{
            //    field: 'Id', title: '操作', width: 100, formatter: function (value, row, index) {
            //        if (row.Id) {
            //            return "<a class='localedit' href='#" + row.Id + "' onclick='testfun()'>编辑</a>";
            //        } else {
            //            return "";
            //        }
            //    }
            //}
        ]],
        onSelect: function (rowIndex, rowData) {
            if (rowData != null) {
                $('#customer_selected_id').val(rowData.Id);
                $('#customer_selected_name').val(rowData.Name);
                $('#customer_selected_mobile').val(rowData.Mobile);
                $('#customer_selected_company').val(rowData.Company);
                $('#customer_selected_note').val(rowData.Note);
            }
            
        }
    });

   
};
