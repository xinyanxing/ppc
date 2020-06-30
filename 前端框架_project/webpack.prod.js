// 'user strict'
// const glob = require('glob')
// const path = require('path')
// const webpack = require('webpack');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //压缩css
// const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //提取css
// const HtmlWebpackPlugin = require('html-webpack-plugin')  //压缩html
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');  //清理构建目录  v3
// const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')


// const setMPA = () => {
//     let entry = {};
//     let htmlWebpackPlugins = [];
//     const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));

//     Object.keys(entryFiles).map((index) => {
//         const entryFileSingle = entryFiles[index]
//         const match = entryFileSingle.match(/src\/(.*)\/index\.js/);
//         const pageName = match && match[1]
//         entry[pageName] = entryFileSingle
//         htmlWebpackPlugins.push(
//             new HtmlWebpackPlugin({
//                 template: path.join(__dirname, `./src/${pageName}/index.html`),
//                 filename: `${pageName}.html`,
//                 chunks: ['vendors', pageName],
//                 inject: true,
//                 minify: {
//                     html5: true,
//                     collapseWhitespace: true,
//                     preserveLineBreaks: false,
//                     minifyCSS: true,
//                     minifyJS: true,
//                     removeComments: false
//                 }
//             })
//         );

//     })
//     return {
//         entry,
//         htmlWebpackPlugins
//     }


// }
// const { entry, htmlWebpackPlugins } = setMPA()
// module.exports = {
//     entry: entry,
//     //无论多入口还是单入口output只有一个 占位符【name]
//     //webpack 原生只支持js json
//     output: {
//         path: path.join(__dirname, 'dist'),
//         filename: '[name]_[chunkhash:8].js',
//     },
//     mode: 'production',
//     module: {
//         rules: [
//             {
//                 test: /.js$/,
//                 use: 'babel-loader'
//             },
//             {
//                 test: /.css$/,
//                 use: [
//                     MiniCssExtractPlugin.loader,
//                     'css-loader'
//                 ]
//             },
//             {
//                 test: /.less$/,
//                 use: [
//                     MiniCssExtractPlugin.loader,
//                     'css-loader',
//                     'less-loader',
//                     {
//                         loader: 'postcss-loader',
//                         options: {
//                             plugins: () => [
//                                 require('autoprefixer')({
//                                     Browserslist: ['defaults'] //css3 自动补充前缀
//                                 })
//                             ]
//                         }
//                     }
//                 ]
//             },
//         ]
//     },
//     plugins: [
//         //提取css
//         new MiniCssExtractPlugin({
//             filename: '[name]_[contenthash:8].css'
//         }),
//         //压缩css
//         new OptimizeCSSAssetsPlugin({
//             assetNameRegExp: /\.css$/g,
//             cssProcessor: require('cssnano')
//         }),
//         //清理构建目录
//         new CleanWebpackPlugin(),
//         //拆分公共包 一
//         // new HtmlWebpackExternalsPlugin({
//         //     externals: [
//         //         {
//         //             module: 'react',
//         //             entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
//         //             global: 'React',
//         //         },
//         //         {
//         //             module: 'react-dom',
//         //             entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
//         //             global: 'ReactDom',
//         //         },
//         //     ]
//         // })

//     ].concat(htmlWebpackPlugins), //压缩html
//     //拆分公共包 一
//     optimization: {
//         splitChunks: {
//             minSize: 0,
//             cacheGroups: {
//                 commons: {
//                     test: /react|react-dom/,
//                     name: 'vendors',
//                     chunks: 'all',
//                     minChunks: 2
//                 }
//             }
//         }
//     },
// }