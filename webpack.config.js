const path = require('path');
var webpack=require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var getHtmlConfig=function(name){
    return {
        filename:'view/'+name+'.html',
        template:'./src/view/'+name+'.html',
        inject:'true',
        hash:'true',
        chunks:['common',name]
    };
};
//webpack config
const config = {
    entry:{
        'common':['./src/page/common/index.js'],
        'index':['./src/page/index/index.js'],
        'login':['./src/page/login/login.js']
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
                    <!-- 小于8k的转化为Base64 -->
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
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        inline: true,//注意：不写hot: true，否则浏览器无法自动更新；也不要写colors:true，progress:true等，webpack2.x已不支持这些
    },
    plugins:[
        //通用模块到JS/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name:'common',
            filename:'JS/base.js'
        }),
        //css单独打包
        new ExtractTextPlugin("css/[name].css"),
        //对HTML的单独处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
    ]

};

module.exports = config;