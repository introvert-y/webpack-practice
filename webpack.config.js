const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 在再次打包的时候，自动清除打包产生的dist文件夹，不需要单独配置shell去删除了
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  // mode: 'production',
  mode: 'development',
  devtool: 'source-map',
  entry: {
    main: path.resolve(__dirname, 'src/index'),
    sub: path.resolve(__dirname, 'src/test'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'), // 模板文件
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin(),
  ],
  module: {
    rules: [
      // {
      //   // 命中 js 文件
      //   test: /\.js$/,
      //   // 使用 babel-loader 来解析 js 文件
      //   use: ['babel-loader'],
      //   // 只命中 src 目录下的 js 文件，加快 webpack 的加载速度
      //   include: path.resolve(__dirname, 'src')
      // },
      // {
      //   // 命中 less 文件
      //   test: /\.less$/,
      //   // 从右到左依次使用 less-loader、css-loader、style-loader
      //   use: ['style-loader', 'css-loader', 'less-loader'],
      //   // 排除 node_modules 下面的 less 文件
      //   exclude: path.resolve(__dirname, 'node_modules')
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        // 命中字体、图片文件
        test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
        // 采用 file-loader 加载，并给 file-loader 传入
        // 相应的配置参数，通过 placeholders 指定 输出的名字
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'images/',
          }
        },
      }
    ]
  },
  // stats: 'errors-only',
  devServer: {
    // host: true,
    hot: true,
    liveReload: false,
    contentBase: path.join(__dirname, 'dist'), // 指定目录 起 服务器
    open: true, // 项目启动自动打开浏览器 true 为默认浏览器
    port: 9000 // 在 9000 端口起服务
  },
}
