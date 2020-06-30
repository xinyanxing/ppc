'user strict'
const glob = require('glob')
const path = require('path')
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const siteTitle = {
    publicPath: '/dimp/',
    port: '9010',
    distPath: './dist',
    siteTitle: 'dimp',
    selfBaseName: '/dimp',
}

module.exports = {
    entry: path.join(__dirname, './src/index/index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /.js?$/,
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
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css', 'less'],
        alias: {
            src: path.resolve('./src'),
            model: path.resolve('./src/model'),
            view: path.resolve('./src/view'),
            component: path.resolve('./src/component'),
            router: path.resolve('./src/router'),
            assets: path.resolve('./src/assets'),
            utils: path.resolve('./src/utils'),
            // 'styled-components': path.resolve(__dirname, '../node_modules/styled-components'),
            'react': path.resolve(__dirname, './node_modules/react'), // for react hooks
        }
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve('./src/index/index.html'),
            filename: 'index.html',
            title: siteTitle
        }),

    ],
    devtool: 'source-map'

}