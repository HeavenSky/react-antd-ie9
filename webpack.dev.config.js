const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");

const commonConfig = require("./webpack.common.config.js");
const devConfig = {
	devtool: "cheap-module-eval-source-map",
	output: {
		/*这里本来应该是[chunkhash]的，但是由于[chunkhash]和webpack-dev-server --hot不兼容。只能妥协*/
		filename: "js/[name].[hash:5].js",
	},
	module: {
		rules: [
			{
				test: /_+\.css$/i,
				use: [
					"style-loader",
					"css-loader?modules&localIdentName=[name]_[local]_[hash:base64:5]",
				],
			},
			{
				test: /[^_]+\.css$/i,
				use: ["style-loader", "css-loader", "postcss-loader"],
			},
			{
				test: /\.less$/i,
				use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": { "NODE_ENV": JSON.stringify("development") },
		}),
	],
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		historyApiFallback: true,
		inline: false, // ie11以下不支持inline
		open: false,
		publicPath: "/",
		host: "0.0.0.0",
		port: 8888,
		proxy: {
			"/mockjs": {
				target: "https://www.easy-mock.com",
				secure: true,
				changeOrigin: true,
				pathRewrite: { "^/mockjs": "/mock/5a355bde12b3e26d1c754337" },
			},
		},
	},
};

module.exports = merge(commonConfig, devConfig);