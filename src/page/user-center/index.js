/**
 * Created by w on 2017/7/31 0031.
 */
require('./index.css');
require('../common/nav/index.js');
require('../common/header/index.js');
var _user=require('../../service/user-server.js');
var _mm = require('../../util/mm.js');
var templateIndex=require('./index.string');
var navSide = require('../common/nav-side/index.js');
var page={
    init:function(){
        this.onLoad();
    },
    onLoad:function(){
        //初始化左侧菜单
        navSide.init({
            name : 'user-center'
        });
        this.loadUserInfo();
    },
    //加载用户信息
    loadUserInfo:function(){
        var userHtml='';
        _user.getUserInfo(function(res){
            userHtml=_mm.renderHtml(templateIndex,res);
                $('.panel-body').html(userHtml);
            },function(errMsg){
                _mm.errorTips(errMsg);
            }
        );
    }
};
$(function() {
    page.init();
});