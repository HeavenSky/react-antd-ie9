const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common.config.js');
const devConfig = {
	devtool: 'cheap-module-eval-source-map',
	output: {
		/*这里本来应该是[chunkhash]的，但是由于[chunkhash]和webpack-dev-server --hot不兼容。只能妥协*/
		filename: 'js/[name].[hash:5].js',
	},
	module: {
		rules: [{
			test: /\.css$/i,
			use: ['style-loader', 'css-loader', 'postcss-loader'],
		}, {
			test: /\.less$/i,
			use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
		}],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': { 'NODE_ENV': JSON.stringify('development') },
		}),
	],
	devServer: {
		contentBase: path.join(__dirname, './dist'),
		historyApiFallback: true,
		inline: false, // ie11以下不支持会报错
		open: false,
		publicPath: '/',
		host: 'localhost',
		port: 8888,
		proxy: {
			'/proxy': {
				target: 'https://www.easy-mock.com',
				secure: true,
				changeOrigin: true,
				pathRewrite: { '^/proxy': '/mock/123456789' },
			},
		},
	},
};

module.exports = merge(commonConfig, devConfig);