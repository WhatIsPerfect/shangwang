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
              //����ɹ�
              if(0 === res.status){
                  typeof param.success === 'function' && param.success(res.data,res.msg);
              }
              //û�е�¼״̬����Ҫǿ�Ƶ�¼
              else if(10 === res.status){
                  _this.dologin();
              }
              //�������ݴ���
              else if(1 === res.status){
                  typeof param.error === 'function' && param.success(res.msg);
              }


          },
          error:function(err){
                typeof  param.error === 'function' && param.success(err.statusText);
          }


  });},
    //��ȡ��������ַ
    getServerUrl:function(path){
        return conf.serverHost+path;
    },
    //��ȡurl����
    getUrlParam:function(name){
       var reg=new RegExp('(^|&)'+name+'=([^&]*)(&|$)');
        var result=window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]):null;
    },
    //��Ⱦhtmlģ��
    renderHtml:function(htmlTemplate,data){
        var template = Hogan.compile(htmlTemplate);
        var result=template.render(data);
        return result;
    },
    //�ɹ���ʾ
    successTips:function(msg){
        alert(msg || '�����ɹ�');
    },
    //������ʾ
    errorTips:function(msg){
        alert(msg || '���ﲻ��');
    },
    //�ֶε���֤��֧�ַǿա��ֻ���������ж�
    validata:function(value,type){
        var value= $.trim(value);
        //�ǿ���֤
        if('require'===type){
            return !!value;
        }
        //�ֻ���֤
        if('phone'===type){
            return /^1\d{10}$/.test(value);
        }
        //������֤
        if('email'===type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    //ͳһ��¼����
    dologin:function(){
        window.location.href='./login.html?redirect='+encodeURIComponent(window.location.href);
    },
    goHome:function(){
        window.location.href='./index.string';
    }

};
module.exports=_mm;