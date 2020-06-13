'user strict'
const glob = require('glob')
const path = require('path')
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpackBaseConfig = require('./webpack.base');
const FriendlyErrors = require('friendly-errors-webpack-plugin');
const getLocalHost = () => {
    const os = require('os');
    const iFaces = os.networkInterfaces();
    let host = '127.0.0.1';
    for (const dev in iFaces) {
        if (iFaces.hasOwnProperty(dev)) {
            iFaces[dev].forEach(function (details) {
                if (
                    details.family === 'IPv4' &&
                    details.address.indexOf('192.168') >= 0
                ) {
                    host = details.address;
                }
            });
        }
    }
    return host;
}
var host = getLocalHost();
var port = 8011;
var publicPath = '/idmp/';


module.exports = webpackMerge(webpackBaseConfig, {
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    mode: 'development',
    module: {
        rules: [
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
        new CleanWebpackPlugin(),

        new FriendlyErrors({
            compilationSuccessInfo: {
                messages: [`编译成功 运行于http://${host}:${port}${publicPath}`]
            }
        })

    ],
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        hot: true,
        compress: true,
        host,
        port,
        publicPath,
        open: true,
        noInfo: true,
        openPage: publicPath.slice(1),
        clientLogLevel: 'none',
        overlay: {
            warnings: true,
            errors: true
        },
        historyApiFallback: {
            rewrites: [
                {
                    from: new RegExp(`^${publicPath}`),
                    to: `${publicPath}index.html`
                }
            ]
        },
        // proxy: {
        //     context: ['/api'],
        //     target: 'http://localhost:3000',
        // }
    },
    devtool: 'cheap-module-source-map'

})