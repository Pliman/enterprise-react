'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//var StatsPlugin = require('stats-webpack-plugin');
var clean = require('clean-webpack-plugin');

module.exports = {
	entry: [
		path.join(__dirname, 'app/App.js')
	],
	output: {
		path: path.join(__dirname, '/dist/'),
		filename: '[name]-[hash].min.js'
	},
	plugins: [
		new clean(['dist']),
		new webpack.optimize.OccurenceOrderPlugin(),
		new HtmlWebpackPlugin({
			template: 'app/index.html',
			inject: 'body',
			filename: 'index.html'
		}),
		new ExtractTextPlugin('[name]-[hash].min.css'),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false,
				screw_ie8: true
			}
		}),
		//new StatsPlugin('webpack.stats.json', {
		//	source: false,
		//	modules: false
		//}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		})
	],
	module: {
		loaders: [{
			test: /\.js?$/,
			exclude: /node_modules/,
			loader: 'babel'
		}, {
			test: /\.json?$/,
			loader: 'json'
		}, {
			test: /\.css$/,
			loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[name]---[local]---[hash:base64:5]!postcss')
		}, {
			test: /\.less$/,
			loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
		}, {
			test: /\.(woff(2)?|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: "file-loader"
		}, {
			test: /\.(png|jpg|jpeg|gif)$/,
			loader: 'file-loader?name=i/[name].[ext]'
		}]
	},
	postcss: [
		require('autoprefixer')
	]
};