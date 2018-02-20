const path = require("path");
const webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";
const dllConfig = {
	resolve: {
		extensions: [".js", ".jsx", ".json"],
	},
	entry: {
		shim: [
			"console-polyfill",
			"babel-polyfill",
			"raf/polyfill",
			"media-match",
		],
		public: [
			"axios",
			"moment",
			"numeral",
			"signals",
			"js-cookie",
			"pubsub-js",
			"moment/locale/zh-cn",
		],
		vendor: [
			"nprogress",
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
			"process.env": {
				"NODE_ENV": JSON.stringify(
					isProd ? "production" : "development"
				),
			},
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
if (isProd) {
	dllConfig.plugins.push(new UglifyJSPlugin());
}

module.exports = dllConfig;