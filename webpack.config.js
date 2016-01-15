// 参考
// http://liginc.co.jp/web/js/149577 
var webpack = require("webpack");
var path = require('path');
 
module.exports = {
      entry: {
        'common/vendor': './source/assets/javascripts/common/vendor.js',
        'smart/top': './source/assets/javascripts/smart/top.js',
        'pc/top':    './source/assets/javascripts/pc/top.js'
      },
    output: {
        path: __dirname + '/dist/assets/javascripts/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.html'],
        modulesDirectories: ['node_modules'],
    },
    module: {
        loaders: [
            {
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: 'babel-loader?presets[]=es2015'
            },
            { 
                test: /\.html$/, 
                loader: "underscore-template-loader" 
            }
        ]
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery",
            jquery: "jquery",
            _: "lodash"
        })
    ]
};
