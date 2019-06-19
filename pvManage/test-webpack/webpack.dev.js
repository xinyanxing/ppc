'user strict'
const path = require('path')
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css
const { cleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = {
    entry: {
        index: './src/index.js',
        search: './src/search.js'
    },
    //无论多入口还是单入口output只有一个 占位符【name]
    //webpack 原生只支持js json
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /.js$/,
                use: 'babel-loader'
            },
            {
                test: /.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',

                ]
            }
        ],

    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), //热更新
        new cleanWebpackPlugin(),

    ],

    devServer: {
        contentBase: './dist',
        hot: true
    },

}