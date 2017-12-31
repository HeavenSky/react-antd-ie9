const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = {
	entry: {},
	output: {
		path: path.join(__dirname, './dist'),
		filename: 'js/[name].[chunkhash:5].js',
		chunkFilename: 'js/[name].[chunkhash:5].js',
		publicPath: './',
	},
	module: {
		rules: [{
			test: /\.jsx?$/i,
			use: [{
				loader: 'babel-loader',
				options: {
					cacheDirectory: true,
				},
			}],
			include: path.join(__dirname, 'src'),
			exclude: path.join(__dirname, 'src/static')
		}, {
			test: /\.(bmp|gif|ico|jpg|png)$/i,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 3072,
					name: 'img/[name].[hash:5].[ext]',
				},
			}],
		}],
	},
	plugins: [
		new CopyWebpackPlugin([{
			from: 'src/static',
			to: 'static',
		}, {
			context: 'build',
			from: '*.dll.js',
			to: 'static/js',
		}]),
		new webpack.ContextReplacementPlugin(
			/moment[\\/]locale$/i,
			/^\.\/zh-cn$/i,
		),
		// new webpack.IgnorePlugin(/^\.\/locale$/i, /moment$/i),
		new webpack.HashedModuleIdsPlugin(),
		new webpack.optimize.CommonsChunkPlugin({ name: 'runtime' }),
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require('./build/vendor.manifest.json'),
		}),
	],
	resolve: {
		alias: {
			actions: path.join(__dirname, 'src/actions'),
			reducers: path.join(__dirname, 'src/reducers'),
			components: path.join(__dirname, 'src/components'),
			containers: path.join(__dirname, 'src/containers'),
			constants: path.join(__dirname, 'src/constants'),
			utils: path.join(__dirname, 'src/utils'),
		},
	},
};
const addPagePlugin = name => {
	const app = name ? name + '/index' : 'index';
	commonConfig.entry[app] = [
		'babel-polyfill',
		path.join(__dirname, 'src/view/' + app + '.js'),
	];
	commonConfig.output.publicPath = name ? '/' : './';
	commonConfig.plugins.push(
		new HtmlWebpackPlugin({
			filename: app + '.html',
			template: path.join(__dirname, 'src/index.html'),
			chunks: ['runtime', app],
			inject: true,
			xhtml: true,
			hash: true,
		})
	);
};
const pageList = ['']; // 多页面打包
pageList.forEach(v => addPagePlugin(v));

module.exports = commonConfig;