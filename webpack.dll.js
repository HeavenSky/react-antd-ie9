var path = require('path');
var webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	entry: {
		shim: [
			'console-polyfill',
			'es5-shim',
			'es5-shim/es5-sham',
			'html5shiv',
		],
		vendor: [
			'raf/polyfill',
			'babel-polyfill',
			'react',
			'redux',
			'react-dom',
			'redux-undo',
			'react-redux',
			'redux-thunk',
			'redux-logger',
			'react-router-dom',
			'react-title-component',
			'pubsub-js',
			'signals',
			'numeral',
			'jquery',
			'moment',
		],
	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: '[name].dll.js',
		library: '[name]_[chunkhash:5]',
		// library 与 DllPlugin 中的 name 一致
	},
	plugins: [
		new CleanWebpackPlugin(['build']),
		new webpack.DefinePlugin({
			'process.env': { 'NODE_ENV': JSON.stringify('production') },
		}),
		new webpack.ContextReplacementPlugin(
			/moment[\/\\]locale$/i,
			/^\.\/(zh-cn)$/i,
		),
		new webpack.DllPlugin({
			context: __dirname,
			name: '[name]_[chunkhash:5]',
			path: path.join(__dirname, 'build', '[name].manifest.json'),
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: { warnings: false },
			output: { comments: false },
		}),
	],
};