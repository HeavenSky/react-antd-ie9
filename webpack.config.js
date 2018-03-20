const path = require("path");
const dir = path.join.bind(path, __dirname);
const isProd = process.env.NODE_ENV === "production";

const webpack = require("webpack");
const merge = require("webpack-merge");
const HappyPack = require("happypack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const currentConfig = require(isProd ? "./webpack.cfg" : "./webpack.cfg.dev");
const commonConfig = {
	entry: {
		shim: [
			"console-polyfill",
			"babel-polyfill",
			"raf/polyfill", // 支持 react16 所必须
			"media-match", // 支持 antd 所必须
		],
		public: [
			dir("src/utils/public.js"),
		],
	},
	output: {
		path: dir("dist"),
		filename: "js/[name].[chunkhash:5].js",
		// 用import()按需加载 https://doc.webpack-china.org/api/module-methods/#import-
		chunkFilename: "js/[name].[chunkhash:5].js",
		publicPath: "./",
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/i,
				use: "happypack/loader?cacheDirectory=true&id=jsx",
				include: dir("src"),
				exclude: dir("src/static"),
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
			threads: 4,
			loaders: [{
				loader: "babel-loader",
				options: {
					cacheDirectory: true,
				},
			}],
		}),
		new CopyWebpackPlugin([
			{
				from: "src/static",
				to: "static",
			},
			{
				context: "build",
				from: "*.dll.js",
				to: "static/js",
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
		new webpack.optimize.CommonsChunkPlugin({
			name: "runtime",
			minChunks: Infinity,
		}),
		/*new webpack.ContextReplacementPlugin(
			/moment[\\/]locale$/i,
			/^\.\/zh-cn$/i,
		),*/
		new webpack.IgnorePlugin(/^\.\/locale$/i, /moment$/i),
	],
	resolve: {
		alias: {
			/*api: dir("src/api"),
			components: dir("src/components"),
			containers: dir("src/containers"),
			constants: dir("src/constants"),
			reducers: dir("src/reducers"),
			actions: dir("src/actions"),
			routes: dir("src/routes"),
			styles: dir("src/styles"),
			views: dir("src/views"),
			utils: dir("src/utils"),
			"@": dir("src"),*/
		},
		extensions: [".js", ".jsx", ".json"],
	},
	performance: {
		hints: false,
	},
};
const addPagePlugin = name => {
	const app = name ? name + "/index" : "index";
	commonConfig.entry[app] = [
		dir("src/views/" + app + ".js"),
	];
	commonConfig.plugins.push(
		new HtmlWebpackPlugin({
			filename: app + ".html",
			template: dir("src/index.html"),
			title: app + " Home Page",
			chunks: ["runtime", "shim", "public", app],
			chunksSortMode: "manual",
			inject: true,
			xhtml: true,
			hash: true,
		})
	);
};
const pageList = [""]; // 多页面打包
pageList.forEach(v => addPagePlugin(v));
commonConfig.output.publicPath = pageList.length > 1 ? "/" : "./";

module.exports = merge(commonConfig, currentConfig);