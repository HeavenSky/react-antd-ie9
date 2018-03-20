const fs = require("fs");
const path = require("path");
const dir = path.join.bind(path, __dirname);
const isProd = process.env.NODE_ENV === "production";
const fm = (list, file) => {
	const txt = list.map(
		v => fs.readFileSync(dir(v), "utf-8")
	).join("\n") || "";
	const target = dir("build");
	fs.existsSync(target) || fs.mkdirSync(target);
	fs.writeFileSync(dir("build", file), txt, "utf-8");
};

const jsList = [
	"jquery/dist/jquery",
	"jquery-ui-dist/jquery-ui",
].map(v => isProd
	? `node_modules/${v}.min.js`
	: `node_modules/${v}.js`
);
fm(jsList, "jquery.dll.js");

const webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const dllConfig = {
	entry: {
		shim: [
			"console-polyfill",
			"babel-polyfill",
			"raf/polyfill",
			"media-match",
		],
		public: [
			"pace",
			"axios",
			"moment",
			"numeral",
			"signals",
			"js-cookie",
			"nprogress",
			"pubsub-js",
			"moment/locale/zh-cn",
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
		path: dir("build"),
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
			path: dir("build", "[name].manifest.json"),
		}),
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
if (isProd) {
	dllConfig.plugins.push(new UglifyJSPlugin({
		sourceMap: false,
	}));
}

module.exports = dllConfig;