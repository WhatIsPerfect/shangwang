const path = require('path');
var webpack=require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var getHtmlConfig=function(name,title){
    return {
        filename:'view/'+name+'.html',
        template:'./src/view/'+name+'.html',
        title:title,
        inject:'true',
        hash:'true',
        chunks:['common',name]
    };
};
//webpack config
const config = {
    entry:{
        'common':['./src/page/common/index.js','webpack-dev-server/client?http://localhost:8088'],
        'index':['./src/page/index/index.js'],
        'login':['./src/page/login/login.js'],
        'login':['./src/page/result/index.js']
    },
    output: {
        path: path.resolve('./dist'),
        publicPath:'/dist',
        filename: 'JS/[name].js'
    },
    externals:{
        'jQuery':'window.jQuery'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({fallback: "style-loader", use: ["css-loader"]})
            } ,
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 8000,
                    <!-- С��8k��ת��ΪBase64 -->
                    name: 'source/[name].[hash:7].[ext]'
                }
            },

            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 8000,
                    name: 'font/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.string$/,
                use: {
                    loader: 'html-loader', options: {
                        attrs: [':data-src']
                    }
                }
            }
        ]
    },
  /* resolve:{
        alias:{
            util: __dirname+'/src/util',
            image: __dirname+'/src/image',
            page: __dirname+'/src/page',
            service: __dirname+'/src/service'
        }

    },*/
    plugins:[
        //ͨ��ģ�鵽JS/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name:'common',
            filename:'JS/base.js'
        }),
        //css�������
        new ExtractTextPlugin("css/[name].css"),
        //��HTML�ĵ�������
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
    ]

};

module.exports = config;