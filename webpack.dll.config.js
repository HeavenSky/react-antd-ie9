var path = require('path');
var webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	entry: {
		vendor: [
			'raf/polyfill',
			'core-js/es6/map',
			'core-js/es6/set',
			'react',
			'react-dom',
			'react-router-dom',
			'redux',
			'react-redux',
			'redux-logger',
			'redux-thunk',
			'redux-undo',
			"pubsub-js",
			"signals",
			"numeral",
			"jquery",
			"moment",
		],
	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: '[name].dll.js',
		library: '[name]_[chunkhash:5]',
		// library 与 DllPlugin 中的 name 一致
	},
	plugins: [
		new CleanWebpackPlugin([
			'build',
			'dist',
		]),
		new webpack.DefinePlugin({
			'process.env': { 'NODE_ENV': JSON.stringify('production') },
		}),
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