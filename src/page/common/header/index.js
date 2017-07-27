/**
 * Created by w on 2017/7/26 0026.
 */
require('./index.css');
var _mm=require('../../../util/mm.js');
var header={
    init:function(){
        this.bindEvent();
    },
    onLoad:function(){
        var keyword=_mm.getUrlParam('keyword');
        //keyword存在，则回填输入框
        if(keyword){
            $('#search-input').val(keyword);
        };
    },
    bindEvent:function(){
        var _this=this;
        //点击按钮作搜索提交
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        //输入回车后提交，做搜索提交
        $('#search-input').keyup(function(e){
            //13是回车键keyCode
            if(e.keyCode === 13){
                _this.searchSubmit();
            }
        });
    },
    //搜索提交
    searchSubmit:function(){
        var keyword= $.trim($('#search-input').val());
        if(keyword){
            window.location.href='./list.html?keyword='+keyword;
        }
        else{
            _mm.goHome();
        }
    }
};
header.init();