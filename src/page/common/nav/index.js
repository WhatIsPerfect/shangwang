/**
 * Created by w on 2017/7/26 0026.
 */
require('./index.css');
var _mm=require('../../../util/mm.js');
var _user=require('../../../service/user-server.js');
var _cart=require('../../../service/cart-server.js');
//����
var nav={
    init:function(){
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent:function(){
        //��¼����¼�
        $('.js-login').click(function(){
            _mm.dologin();
        });
        //ע�����¼�
        $('.js-register').click(function(){
            window.location.href='./register.html';
        });
        //�˳�����¼�
        $('.js-logout').click(function(){
            _user.logout(function(res){
                window.location.reload();
            },function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
    },
    //�����û���Ϣ
    loadUserInfo:function(){
        _user.checkLogin(function(res){
            $('.user.not-login').hide().siblings('.user.login').show()
                . find('.username').text(res.username);
        },function(errMsg){

        });
    },
    //���ع��ﳵ����
    loadCartCount:function(){
        _cart.getCartCount(function(res){
            $('.nav .cart-cont').text(res||0);
        },function(errMsg){
            $('.nav .cart-cont').text(0);
        });
    }
};
module.exports=nav.init();
