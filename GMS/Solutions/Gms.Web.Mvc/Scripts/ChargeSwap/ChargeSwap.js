﻿
var ChargeSwap;
if (!ChargeSwap) {
    ChargeSwap = {};
}

ChargeSwap.Init = function () {

    var features = 'dialogHeight=480; dialogWidth=800; center=yes;location=0; resizable=0; status=0';

    $('#entity_search_list').datagridEx({
        toolbar: '#toolbar',
        pagination: true,
        singleSelect:true,
        columns: [[
            { field: 'OrigAccountName', title: '源账户', width: 100 },
            { field: 'DestAccountName', title: '目的账户', width: 100 },
            { field: 'Amount', title: '记账金额', width: 100 },
            { field: 'CreatorName', title: '登记人', width: 100 },
            { field: 'CreateTimeString', title: '登记日期', width: 100 },
            { field: 'AuditState', title: '审核状态', width: 100 },
            { field: 'AuditorName', title: '审核人', width: 100 },
            { field: 'AuditTimeString', title: '审核日期', width: 100 },
            { field: 'AuditNote', title: '审核说明', width: 100 },
            { field: 'Note', title: '备注', width: 100 }
        ]]
    });

    $("#btnAdd").click(function () {

        var vReturnValue = window.showModalDialog('/ChargeSwap/Edit', '添加流转记账', features);
        if (vReturnValue != undefined) {
            $('#entity_search_list').datagridEx("reload");
        }

    });

    $("#btnInfo").click(function () {

        var rec = $('#entity_search_list').datagridEx("getSelected");

        if (rec == null) {
            return;
        }

        var vReturnValue = window.showModalDialog('/ChargeSwap/Info?id=' + rec.Id, '查看流转记账', features);
        if (vReturnValue != undefined) {
            $('#entity_search_list').datagridEx("reload");
        }

    });

    $("#btnEdit").click(function () {

        var rec = $('#entity_search_list').datagridEx("getSelected");

        if (rec == null || rec.AuditState != "审核失败") {
            $.messager.alert("提示", "只能修改审核失败的记账");
            return;
        }

        var vReturnValue = window.showModalDialog('/ChargeSwap/Edit?id=' + rec.Id, '修改流转记账', features);
        if (vReturnValue != undefined) {
            $('#entity_search_list').datagridEx("reload");
        }

    });

};

ChargeSwap.Audit = function () {

    var features = 'dialogHeight=480; dialogWidth=800; center=yes;location=0; resizable=0; status=0';

    $('#entity_search_list').datagridEx({
        toolbar: '#toolbar',
        pagination: true,
        singleSelect:true,
        columns: [[
            { field: 'OrigAccountName', title: '源账户', width: 100 },
            { field: 'DestAccountName', title: '目的账户', width: 100 },
            { field: 'Amount', title: '记账金额', width: 100 },
            { field: 'CreatorName', title: '登记人', width: 100 },
            { field: 'CreateTimeString', title: '登记日期', width: 100 },
            { field: 'Note', title: '备注', width: 100 },
            { field: 'Pass', title: '通过', width: 100, formatter: function(value, row, index) {
                if (row.Id) {
                    return "<a class='btnAudit' href='#1" + row.Id + "' >通过</a>";
                } else {
                    return "";
                }
            }},
            {
                field: 'NoPass', title: '不通过', width: 100, formatter: function (value, row, index) {
                    if (row.Id) {
                        return "<a class='btnAudit' href='#0" + row.Id + "'>不通过</a>";
                    } else {
                        return "";
                    }
                }
            }
        ]]
    });
    
    $("#btnEdit").click(function () {

        var rec = $('#entity_search_list').datagridEx("getSelected");

        if (rec == null) {
            return;
        }

        var vReturnValue = window.showModalDialog('/ChargeSwap/Info?id=' + rec.Id, '查看流转记账', features);
        if (vReturnValue != undefined) {
            $('#entity_search_list').datagridEx("reload");
        }

    });

    $(".btnAudit").live("click", function() {
        var nPass = this.hash.substr(1,1);
        var nId = this.hash.substr(2);

        $.post("/ChargeSwap/SaveAudit", { id: nId, pass: nPass }, function (data) {
            if (data.success) {

                $('#entity_search_list').datagridEx("reload");

            } else {
                $.messager.alert('错误', '审核失败：' + data.data, 'error');
            }
        }, 'json');
    });

};

ChargeSwap.Edit = function () {


    $("#entityform").validate({
        onkeyup: false,
        onfocusout: false,
        rules: {
            Amount: "required"
        },
        messages: {
            Amount: "请输入记账金额"
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
    $("#selectAccountOrig").live("click", function () {

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

                    $("#OrigAccount_Id").val(deptContents.find("#account_selected_Id").val());
                    $("#OrigAccount_Name").val(deptContents.find("#account_selected_Name").val());
                    $("#OrigAmount").val(deptContents.find("#account_selected_Amount").val());

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

    $("#selectAccountDest").live("click", function () {

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

                    $("#DestAccount_Id").val(deptContents.find("#account_selected_Id").val());
                    $("#DestAccount_Name").val(deptContents.find("#account_selected_Name").val());
                    $("#DestAmount").val(deptContents.find("#account_selected_Amount").val());

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

    $("#btnSave").click(function () {

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
    
};

ChargeSwap.Info = function () {

    $("#btnClose").click(function() {

        window.returnValue = "true";
        window.close();
    });
};

