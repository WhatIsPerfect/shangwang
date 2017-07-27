/**
 * Created by w on 2017/7/26 0026.
 */
require('./index.css');
var _mm=require('../../../util/mm.js');
var templateIndex=require('./index.string');
//��ߵ���
var navSide={
    option:{
        name:'',
        navList:[
            {name:'user-center',desc:'个人中心',href:'./user-center.html'},
            {name:'order-list',desc:'我的订单',href:'./order-list.html'},
            {name:'pass-updata',desc:'修改密码',href:'./pass-updata.html'},
            {name:'about',desc:'关于MMall',href:'./about.html'}
        ]
    },
    init:function(option){
        //�ϲ�ѡ��
        $.extend(this.option,option);
        this.renderNav();
    },
    //��Ⱦ�����˵�
    renderNav:function(){
        //����active����
        for(var i= 0,iLength=this.option.navList.length;i<iLength;i++){
            if(this.option.navList[i].name === this.option.name){
                this.option.navList[i].isActive=true;
            }
        };
        //��Ⱦlist����
        var navHtml=_mm.renderHtml(templateIndex,{
            navList:this.option.navList
        });
        //��html��������
        $('.nav-side').html(navHtml);
    }
}
module.exports=navSide;