const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
	entry: {
		main: './src/index.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/, 
				exclude: /node_modules/, 
				loader: 'babel-loader',
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name]_[hash].[ext]',
						outputPath: 'images/',
					}
				}
			},
			{
				// 命中 less 文件
				test: /\.less$/,
				// 从右到左依次使用 less-loader、css-loader、style-loader
				use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader'],
				// 排除 node_modules 下面的 less 文件
				exclude: path.resolve(__dirname, 'node_modules')
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: 'index.html',
		}),
		new FriendlyErrorsWebpackPlugin(),
		function() {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1)
        {
          console.log('build error，no babel loader');
          process.exit(1);
        }
      })
    } 
	],
	stats: 'errors-only',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, '../dist')
	}
}