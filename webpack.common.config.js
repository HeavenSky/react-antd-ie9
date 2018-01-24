const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const commonConfig = {
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
			path.join(__dirname, "src/utils/public.js"),
		],
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "js/[name].[chunkhash:5].js",
		chunkFilename: "js/[name].[chunkhash:5].js",
		publicPath: "./",
	},
	module: {
		rules: [{
			test: /\.jsx?$/i,
			use: [{
				loader: "babel-loader",
				options: {
					cacheDirectory: true,
				},
			}],
			include: path.join(__dirname, "src"),
			exclude: path.join(__dirname, "src/static"),
		}, {
			test: /\.(bmp|gif|ico|jpg|png)$/i,
			use: [{
				loader: "url-loader",
				options: {
					limit: 3072,
					name: "img/[name].[hash:5].[ext]",
				},
			}],
		}],
	},
	plugins: [
		new CopyWebpackPlugin([
			{
				context: "build",
				from: "*.dll.js",
				to: "static/js",
			},
			{
				from: "src/static",
				to: "static",
			},
			{
				context: "node_modules/antd-mobile/dist",
				from: "*mobile.min.css",
				to: "static",
			},
			{
				context: "node_modules/jquery-ui-dist",
				from: "*ui.min.css",
				to: "static",
			},
			{
				from: "node_modules/jquery-ui-dist/images",
				to: "static/images",
			},
		]),
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require("./build/vendor.manifest.json"),
		}),
		/*new webpack.ContextReplacementPlugin(
			/moment[\\/]locale$/i,
			/^\.\/zh-cn$/i,
		),*/
		new webpack.IgnorePlugin(/^\.\/locale$/i, /moment$/i),
		new webpack.optimize.CommonsChunkPlugin({ name: "runtime" }),
		new webpack.HashedModuleIdsPlugin(),
	],
	resolve: {
		alias: {
			/*actions: path.join(__dirname, "src/actions"),
			components: path.join(__dirname, "src/components"),
			containers: path.join(__dirname, "src/containers"),
			constants: path.join(__dirname, "src/constants"),
			reducers: path.join(__dirname, "src/reducers"),
			utils: path.join(__dirname, "src/utils"),*/
		},
	},
};
const addPagePlugin = name => {
	const app = name ? name + "/index" : "index";
	commonConfig.entry[app] = [
		path.join(__dirname, "src/view/" + app + ".js"),
	];
	commonConfig.output.publicPath = name ? "/" : "./";
	const chunksList = ["runtime", "shim", "public", app];
	commonConfig.plugins.push(
		new HtmlWebpackPlugin({
			filename: app + ".html",
			template: path.join(__dirname, "src/index.html"),
			chunks: chunksList,
			chunksSortMode: (a, b) => {
				const x = chunksList.indexOf(a.names[0]);
				const y = chunksList.indexOf(b.names[0]);
				return x - y;
			},
			inject: true,
			xhtml: true,
			hash: true,
		})
	);
};
const pageList = [""]; // 多页面打包
pageList.forEach(v => addPagePlugin(v));

module.exports = commonConfig;