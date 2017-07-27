/**
 * Created by w on 2017/7/27 0027.
 */
require('./index.css');
require('../common/nav-simple/index.js');
var _mm=require('../../util/mm.js');
$(function () {
    var type=_mm.getUrlParam('type')||'default',
        $element=$('.' + type + '-success');
         $element.show();
});