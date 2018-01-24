var path = require("path");
var webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
	resolve: {
		extensions: [".js", ".jsx"],
	},
	entry: {
		shim: [
			"console-polyfill",
			"es5-shim",
			"es5-shim/es5-sham",
			"html5shiv",
			"babel-polyfill",
			"raf/polyfill",
			"media-match",
		],
		public: [
			"when",
			"jquery",
			"moment",
			"numeral",
			"signals",
			"js-cookie",
			"pubsub-js",
			"moment/locale/zh-cn",
			"jquery-ui-dist/jquery-ui",
		],
		vendor: [
			"react",
			"redux",
			"react-dom",
			"redux-undo",
			"react-redux",
			"react-router-dom",
			"react-title-component",
		],
	},
	output: {
		path: path.join(__dirname, "build"),
		filename: "[name].dll.js",
		library: "[name]_[chunkhash:5]",
		// library 与 DllPlugin 中的 name 一致
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": { "NODE_ENV": JSON.stringify("production") },
		}),
		new CleanWebpackPlugin(["build"]),
		/*new webpack.ContextReplacementPlugin(
			/moment[\\/]locale$/i,
			/^\.\/zh-cn$/i,
		),*/
		new webpack.IgnorePlugin(/^\.\/locale$/i, /moment$/i),
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.DllPlugin({
			context: __dirname,
			name: "[name]_[chunkhash:5]",
			path: path.join(__dirname, "build", "[name].manifest.json"),
		}),
	],
};