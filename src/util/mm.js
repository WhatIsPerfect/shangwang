/**
 * Created by w on 2017/7/24 0024.
 */
var Hogan=require('hogan.js');
var conf={
    serverHost:''
};
var _mm={
  request:function(param){
      var _this=this;
      $.ajax({
          type:param.method||'get',
          url:param.url||'',
          dataType:param.type||'json',
          data:param.data||'',
          success:function(res){
              if(0 === res.status){
                  typeof param.success === 'function' && param.success(res.data,res.msg);
              }
              else if(10 === res.status){
                  _this.dologin();
              }
              else if(1 === res.status){
                  typeof param.error === 'function' && param.success(res.msg);
              }


          },
          error:function(err){
                typeof  param.error === 'function' && param.success(err.statusText);
          }


  });},
    getServerUrl:function(path){
        return conf.serverHost+path;
    },
    getUrlParam:function(name){
       var reg=new RegExp('(^|&)'+name+'=([^&]*)(&|$)');
        var result=window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]):null;
    },
    //渲染模块
    renderHtml:function(htmlTemplate,data){
        var template = Hogan.compile(htmlTemplate);
        var result=template.render(data);
        return result;
    },
    successTips:function(msg){
        alert(msg || '操作成功了');
    },
    errorTips:function(msg){
        alert(msg || '哪里不对了');
    },
    //判断非空、手机、邮箱
    validata:function(value,type){
        var value= $.trim(value);
        //非空
        if('require'===type){
            return !!value;
        }
        //手机
        if('phone'===type){
            return /^1\d{10}$/.test(value);
        }
        //邮箱
        if('email'===type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    //ͳ登陆
    dologin:function(){
        window.location.href='./login.html?redirect='+encodeURIComponent(window.location.href);
    },
    goHome:function(){
        window.location.href='./index.string';
    }

};
module.exports=_mm;