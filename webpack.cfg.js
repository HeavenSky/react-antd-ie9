const webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const publicConfig = {
	devtool: false,
	// devtool: "source-map",
	module: {
		rules: [
			{
				test: /_\.css$/i,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader?modules&localIdentName=[hash:base64:8]"],
				}),
			},
			{
				test: /[^_]\.css$/i,
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
		new CleanWebpackPlugin(["dist"]),
		new webpack.DefinePlugin({
			"process.env": { "NODE_ENV": JSON.stringify("production") },
		}),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HashedModuleIdsPlugin(),
		new UglifyJSPlugin({
			sourceMap: false,
		}),
		new ExtractTextPlugin({
			filename: "css/[name].[contenthash:5].css",
			allChunks: true,
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
		}),
	],
};

module.exports = publicConfig;