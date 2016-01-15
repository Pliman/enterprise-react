'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var clean = require('clean-webpack-plugin');

module.exports = {
  entry: {
    browser: path.join(__dirname, 'app/App.js'),
    ieCompatible: path.join(__dirname, 'app/utils/ie-compatible.js'),
    mobile: path.join(__dirname, 'app/App-h5.js'),
    common: ['react', 'react-router']
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name]-[hash].min.js'
  },
  resolve: {
    modulesDirectories: ['node_modules'],
  },
  plugins: [
    new clean(['dist']),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common-[hash].min.js',
      chunks: ['browser', 'mobile']
    }),
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      filename: 'index.html',
      chunks: ['common', 'browser', 'ieCompatible']
    }),
    new HtmlWebpackPlugin({
      template: 'app/index-h5.html',
      inject: 'body',
      filename: 'index-h5.html',
      chunks: ['common', 'mobile']
    }),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
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
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
    }, {
      test: /\.(woff(2)?|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader'
    }, {
      test: /\.(png|jpg|jpeg|gif)$/,
      loader: 'file-loader?name=i/[name].[ext]'
    }]
  },
  postcss: [
    require('autoprefixer')
  ]
};
