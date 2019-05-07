const webpack = require('webpack');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');



// module.exports = {
//   entry:['webpack/hot/dev-server', resolve('ReactDemo/app/main.js')], //提及的唯一入口文件
//   output: {
//     path: resolve('ReactDemo/build'), //目标输出目录 path 的绝对路径
//     filename: 'bundle.js'   //输出文件的文件名
//   },
//   devtool: 'eval-source-map',//此选项控制是否生成，以及如何生成 source map。
//   devServer: {
//     contentBase: [resolve('./public')], //本地服务器所加载的页面所在的目录
//     historyApiFallback: true, //当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。
//     inline: true,
//     hot: true
//   },
//   module: {
//     //创建模块时，匹配请求的规则数组。这些规则能够修改模块的创建方式。这些规则能够对模块(module)应用 loader，或者修改解析器(parser)。
//     rules: [
//       {
//         test: /(\.jsx|\.js)$/,
//         use: {
//           loader: "babel-loader"
//         },
//         exclude: /node_modules/
//       },
//       {
//         test: /\.css$/,
//         use: ExtractTextPlugin.extract({
//           fallback: "style-loader",
//           use: [{
//             loader: "css-loader",
//             options: {
//               modules: true,
//               localIdentName: '[name]__[local]--[hash:base64:5]'
//             }
//           }, {
//             loader: "postcss-loader"
//           }],
//         })
//       }
//     ],
//     plugins: [
//       // new webpack.DefinePlugin(DevUtil.stringifyEnv(env[BUILD_ENV])),
//       new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(zh-cn|en-gb)$/),
//     ]
//   }
// }
// module.exports = {
//   devtool: 'eval-source-map',//生成Source Maps,这里选择eval-source-map
//   entry:['webpack/hot/dev-server', resolve('ReactDemo/app/main.js')], //提及的唯一入口文件
//   // entry: ['webpack/hot/dev-server', __dirname + '/app/main.js'],//唯一入口文件,__dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录
//   output: {//输出目录
//       // path: __dirname + '/build',//打包后的js文件存放的地方
//       path: resolve('ReactDemo/build'), //目标输出目录 path 的绝对路径
//       filename: 'bundle.js'//打包后输出的js的文件名
//   },

//   module: {
//       //loaders加载器
//       loaders: [
//           {
//               test: /\.(js|jsx)$/,//一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
//               exclude: /node_modules/,//屏蔽不需要处理的文件（文件夹）（可选）
//               loader: 'babel'//loader的名称（必须）
//           }
//       ]
//   },

//   //webpack-dev-server配置
//   devServer: {
//       contentBase: './build',//默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到"build"目录）
//       colors: true,//在cmd终端中输出彩色日志
//       historyApiFallback: true,//在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
//       inline: true,//设置为true，当源文件改变时会自动刷新页面
//       port: 8080,//设置默认监听端口，如果省略，默认为"8080"
//       process: true,//显示合并代码进度
//   }
// };


module.exports = {
  devtool: 'eval-source-map',//生成Source Maps,这里选择eval-source-map
  entry: ['webpack/hot/dev-server', __dirname + '/app/main.js'],//唯一入口文件,__dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录
  output: {//输出目录
    path: __dirname + '/build',//打包后的js文件存放的地方
    filename: 'bundle.js'//打包后输出的js的文件名
  },

  module: {
    //loaders加载器
    loaders: [
      {
        test: /\.(js|jsx)$/,//一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
        exclude: /node_modules/,//屏蔽不需要处理的文件（文件夹）（可选）
        loader: 'babel'//loader的名称（必须）
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()//热模块替换插件
  ],

  //webpack-dev-server配置
  devServer: {
    contentBase: './build',//默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到"build"目录）
    colors: true,//在cmd终端中输出彩色日志
    historyApiFallback: true,//在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    inline: true,//设置为true，当源文件改变时会自动刷新页面
    port: 8080,//设置默认监听端口，如果省略，默认为"8080"
    process: true,//显示合并代码进度
  }
};
