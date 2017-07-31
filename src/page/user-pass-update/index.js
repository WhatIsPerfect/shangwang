/**
 * Created by w on 2017/7/31 0031.
 */
/**
 * Created by w on 2017/7/31 0031.
 */
/**
 * Created by w on 2017/7/31 0031.
 */
require('./index.css');
require('../common/nav/index.js');
require('../common/header/index.js');
var _user=require('../../service/user-server.js');
var _mm = require('../../util/mm.js');
var navSide = require('../common/nav-side/index.js');
var page={
    init:function(){
        this.onLoad();
        this.bindEvent();
    },
    bindEvent:function() {
        var _this=this ;
        $(document).on('click','.btn-submit',function(){
            var userInfo={
                    password: $.trim($('#phone').val()),
                    passwordNew: $.trim($('#password-new').val()),
                    passwordConfirm: $.trim($('#password-confirm').val())
                },
                validateResult=_this.validateForm(userInfo);
            if(validateResult.status){
                //更改用户信息
                _user.updatePassword({
                    passwordOld : userInfo.password,
                    passwordNew : userInfo.passwordNew
                },function(res,msg){
                    _mm.successTips(msg);
                },function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            else{
                _mm.errorTips(validateResult.msg);
            }

        });
    },
    onLoad:function(){
        //初始化左侧菜单
        navSide.init({
            name : 'user-pass-update'
        });
    },
    //验证字段信息
    validateForm:function(formData){
        var result = {
            status : false,
            msg     :''
        };
        //验证原密码是否为空
        if(!_mm.validata(formData.password,'require')){
            result.msg='原密码不能为空';
            return result;
        }
        //验证新密码长度
        if(!formData.passwordNew || formData.passwordNew.length<6){
            result.msg='密码长度不能少于6位';
            return result;
        }
        //验证两次密码长度是否一致
        if(!formData.password===formData.passwordConfirm){
            result.msg='两次密码不一致';
            return result;
        }
        //通过验证，返回正确提示
        result.status=true;
        result.msg='验证通过';
        return result;
    }
};
$(function() {
    page.init();
});