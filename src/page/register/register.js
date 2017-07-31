/**
 * Created by w on 2017/7/28 0028.
 */
/**
 * Created by w on 2017/7/24 0024.
 */
require('./register.css');
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
var page={
    init:function(){
        this.bindEvent();
    },
    bindEvent:function(){
        var _this =this;
        //验证username
        $('#username').blur(function(){
            var username= $.trim($(this).val());
            //如果用户名为空，我们不做验证
            if(!username){
                return;
            }
            //异步验证用户名是否存在
            _user.checkUsername(username,function(res){
                formError.hide();
            },function(errMsg){
                formError.show(errMsg);
            });
        });
        //注册按钮的点击
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
                password : $.trim($('#password').val()),
                passwordConfirm : $.trim($('#password-confirm').val()),
                phone : $.trim($('#phone').val()),
                email: $.trim($('#email').val()),
                question : $.trim($('#question').val()),
                answer : $.trim($('#answer').val())
            },
        //表单的验证结果
            validateResult=this.formValidate(formData);
        //验证成功
        if(validateResult.status){
            //提交
            _user.register(formData,function(res){
                window.location.href='./result.html?type=register';
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
            status : false,
            msg     :''
        };
        if(!_mm.validata(formData.username,'require')){
            result.msg='用户名不能为空';
            return result;
        }
        //验证密码是否为空
        if(!_mm.validata(formData.password,'require')){
            result.msg='密码不能为空';
            return result;
        }
        //验证密码长度
        if(formData.password.length<6){
            result.msg="密码长度不能少于6位";
            return result;
        }
        //验证两次输入的密码是否一致
        if(formData.password!=formData.passwordConfirm){
            result.msg='两次密码不一致';
            return result;
        }
        //验证手机号
        if(!_mm.validata(formData.phone,'phone')){
            result.msg='手机号码格式不正确';
            return result;
        }
        //验证邮箱
        if(!_mm.validata(formData.email,'email')){
            result.msg='邮箱格式不正确';
            return result;
        }
        if(!_mm.validata(formData.question,'question')){
            result.msg='密码提示问题不能为空';
            return result;
        }
        if(!_mm.validata(formData.answer,'answer')){
            result.msg='密码提示问题答案不能为空';
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