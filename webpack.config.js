const webpack = require("webpack");
const merge = require("webpack-merge");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const commonConfig = require("./webpack.common.config.js");
const publicConfig = {
	devtool: "cheap-module-source-map",
	module: {
		rules: [
			{
				test: /_+\.css$/i,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader?modules&localIdentName=[hash:base64:8]"],
				}),
			},
			{
				test: /[^_]+\.css$/i,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader", "postcss-loader"],
				}),
			},
			{
				test: /\.less$/i,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader", "postcss-loader", "less-loader"],
				}),
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": { "NODE_ENV": JSON.stringify("production") },
		}),
		new CleanWebpackPlugin(["dist"]),
		new UglifyJSPlugin(),
		new ExtractTextPlugin({
			filename: "css/[name].[contenthash:5].css",
			allChunks: true,
		}),
	],
};

module.exports = merge(commonConfig, publicConfig);