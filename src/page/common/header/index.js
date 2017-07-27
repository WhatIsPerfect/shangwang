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
        //keyword���ڣ�����������
        if(keyword){
            $('#search-input').val(keyword);
        };
    },
    bindEvent:function(){
        var _this=this;
        //�����ť�������ύ
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        //����س����ύ���������ύ
        $('#search-input').keyup(function(e){
            //13�ǻس���keyCode
            if(e.keyCode === 13){
                _this.searchSubmit();
            }
        });
    },
    //�����ύ
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