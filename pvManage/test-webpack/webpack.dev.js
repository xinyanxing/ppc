'user strict'
const glob = require('glob')
const path = require('path')
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const setMPA = () => {
    let entry = {}
    let htmlWebpackPlugins = []
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))
    Object.keys(entryFiles).map(index => {
        const entryFiledSingle = entryFiles[index]
        const match = entryFiledSingle.match(/src\/(.*)\/index\.js/);
        const pageName = match && match[1]

        entry[pageName] = entryFiledSingle;
        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                template: path.join(__dirname, `./src/${pageName}/index.html`),
                filename: `${pageName}.html`,
                chunks: [pageName],
                inject: true,
                minify: {
                    html5: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: false
                }
            })
        )
    });
    return {
        entry,
        htmlWebpackPlugins
    }
}

const { entry, htmlWebpackPlugins } = setMPA()

module.exports = {
    entry: entry,
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
        new CleanWebpackPlugin(),

    ].concat(htmlWebpackPlugins),

    devServer: {
        contentBase: './dist',
        hot: true
    },
    devtool: 'source-map'

}