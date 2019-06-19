'user strict'
const path = require('path')
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //压缩css
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //提取css
const HtmlWebpackPlugin = require('html-webpack-plugin')  //压缩html
const { CleanWebpackPlugin } = require('clean-webpack-plugin');  //清理构建目录  v3

module.exports = {
    entry: {
        index: './src/index.js',
        search: './src/search.js'
    },
    //无论多入口还是单入口output只有一个 占位符【name]
    //webpack 原生只支持js json
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js',
    },
    mode: 'production',
    module: {
        rules: [

            {
                test: /.js$/,
                use: 'babel-loader'
            },
            {
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    Browserslist: ['defaults'] //css3 自动补充前缀
                                })
                            ]
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        //提取css
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        //压缩css
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        //清理构建目录
        new CleanWebpackPlugin(),
        //压缩html
        new HtmlWebpackPlugin({
            template: path.join(__dirname, `./src/index.html`),
            filename: `index.html`,
            chunks: ['index'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, `./src/search.html`),
            filename: `search.html`,
            chunks: ['search'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }),

    ],
}