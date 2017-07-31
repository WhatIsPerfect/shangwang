/**
 * Created by w on 2017/7/24 0024.
 */
require('./login.css');
require('../common/nav-simple/index.js');
var _mm=require('../../util/mm.js');
var _user=require('../../service/user-server.js');
var formError={
    show:function(errMsg){
        $('err-item').show().find('.err-msg').text(errMsg);
    },
    hide:function(){
        $('err-item').hide().find('.err-msg').text('');
    }
};
//page逻辑部分
var page={
    init:function(){
        this.bindEvent();
    },
    bindEvent:function(){
        //登录按钮的点击
        var _this =this;
        $('#submit').click(function(){
           _this.submit();
        });
        //keyCode === 13 表示回车
        $('.user-content').keyup(function(e){
           if(e.keyCode===13){
               _this.submit();
           }
        });
    },
    submit:function(){
        var formData={
            username : $.trim($('#username').val()),
            password : $.trim($('#password').val())
            },
            //表单的验证结果
         validateResult=this.formValidate(formData);
            //验证成功
        if(validateResult.status){
            //提交
            _user.login(formData,function(res){
                window.location.href=_mm.getUrlParam('redirect')||'./index.html';
            },function(errMsg){
                formError.show(errMsg);
            });
        }
        //验证失败
        else{
            formError.show(validateResult.msg);//错误提示
        }
    },
    //表单验证
    formValidate:function(formData){
        var result = {
            status  : false,
            msg      :''
        };
        if(!_mm.validata(formData.username,'require')){
            result.msg='用户名不能为空';
            return result;
        }
        if(!_mm.validata(formData.password,'require')){
            result.msg='密码不能为空';
            return result;
        }
        //通过验证，返回正确提示
        result.status=true;
        result.msg='验证通过';
        return result;
    }
};
$(function(){
    page.init();
});