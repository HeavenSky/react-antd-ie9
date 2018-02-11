const os = require("os");
const path = require("path");
const webpack = require("webpack");
const HappyPack = require("happypack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const size = os.cpus().length;
const HappyPackPool = HappyPack.ThreadPool({ size });
const commonConfig = {
	entry: {
		shim: [
			"console-polyfill",
			"babel-polyfill",
			"raf/polyfill", // 支持 react16 所必须
			"media-match", // 支持 antd 所必须
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
		rules: [
			{
				test: /\.jsx?$/i,
				use: "happypack/loader?id=jsx",
				include: path.join(__dirname, "src"),
				exclude: path.join(__dirname, "src/static"),
			},
			{
				test: /\.(jpe?g|png|gif|bmp|ico)(\?.*)?$/i,
				use: [{
					loader: "url-loader",
					options: {
						limit: 6144,
						name: "img/[name].[hash:5].[ext]",
					},
				}],
			},
			{
				test: /\.(woff2?|svg|ttf|otf|eot)(\?.*)?$/i,
				use: [{
					loader: "url-loader",
					options: {
						limit: 6144,
						name: "font/[name].[hash:5].[ext]",
					},
				}],
			},
		],
	},
	plugins: [
		new HappyPack({
			id: "jsx",
			threadPool: HappyPackPool,
			loaders: [{
				loader: "babel-loader",
				options: {
					cacheDirectory: true,
				},
			}],
		}),
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
		]),
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require("./build/shim.manifest.json"),
		}),
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require("./build/public.manifest.json"),
		}),
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require("./build/vendor.manifest.json"),
		}),
		/*new webpack.ContextReplacementPlugin(
			/moment[\\/]locale$/i,
			/^\.\/zh-cn$/i,
		),*/
		new webpack.IgnorePlugin(/^\.\/locale$/i, /moment$/i),
		new webpack.optimize.CommonsChunkPlugin({
			name: "runtime",
			minChunks: Infinity,
		}),
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
		extensions: [".js", ".jsx", ".json"],
	},
};
const addPagePlugin = name => {
	const app = name ? name + "/index" : "index";
	commonConfig.entry[app] = [
		path.join(__dirname, "src/views/" + app + ".js"),
	];
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
commonConfig.output.publicPath = pageList.length > 1 ? "/" : "./";

module.exports = commonConfig;