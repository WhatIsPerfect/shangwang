/**
 * Created by w on 2017/7/26 0026.
 */
var _mm=require('../util/mm.js');
var _user={
    //¼ì²éµÇÂ¼×´Ì¬
    checkLogin:function(resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/get_user_info.do'),
            method: 'post',
            success: resolve,
            error: reject

        });
    },
    //ÍË³ö
    logout:function(resolve,reject){
        _mm.request({
            url: _mm.getServerUrl('/user.logout.do'),
            method: 'post',
            success:resolve,
            error:reject

        });
    }
}
module.exports=_user;