var path = require("path");
var webpack = require("webpack");

module.exports = {
	resolve: {
		extensions: [".js", ".jsx", ".json"],
		modules: [path.join(__dirname, "node_modules")],
	},
	entry: {
		shim: [
			"console-polyfill",
			"babel-polyfill",
			"raf/polyfill",
			"media-match",
		],
		public: [
			"jquery",
			"moment",
			"numeral",
			"signals",
			"js-cookie",
			"pubsub-js",
			"nprogress",
			"moment/locale/zh-cn",
			"jquery-ui-dist/jquery-ui.min",
		],
		vendor: [
			"react",
			"react-dom",
			"redux",
			"redux-undo",
			"react-redux",
			"react-router-dom",
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
			"process.env": { "NODE_ENV": JSON.stringify("development") },
		}),
		/*new webpack.ContextReplacementPlugin(
			/moment[\\/]locale$/i,
			/^\.\/zh-cn$/i,
		),*/
		new webpack.IgnorePlugin(/^\.\/locale$/i, /moment$/i),
		new webpack.DllPlugin({
			context: __dirname,
			name: "[name]_[chunkhash:5]",
			path: path.join(__dirname, "build", "[name].manifest.json"),
		}),
	],
};