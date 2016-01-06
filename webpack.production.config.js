'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var clean = require('clean-webpack-plugin');

var nodeModulesPath = path.join(__dirname, 'node_modules');
var modulePath = {
  React: path.join(nodeModulesPath, 'react/dist/react.min.js'),
  React_addons: path.join(nodeModulesPath, 'react/dist/react-with-addons.min.js')
};

module.exports = {
  entry: {
    browser: path.join(__dirname, 'app/App.js'),
    ieCompatible: path.join(__dirname, 'app/utils/ie-compatible.js'),
    mobile: path.join(__dirname, 'app/App-h5.js')
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
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      filename: 'index.html',
      chunks: ["browser", "ieCompatible"]
    }),
    new HtmlWebpackPlugin({
      template: 'app/index-h5.html',
      inject: 'body',
      filename: 'index-h5.html',
      chunks: ["mobile"]
    }),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
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
      loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
    }, {
      test: /\.(woff(2)?|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader"
    }, {
      test: /\.(png|jpg|jpeg|gif)$/,
      loader: 'file-loader?name=i/[name].[ext]'
    }],
    noParse: [modulePath.React, modulePath.React_addons]
  },
  postcss: [
    require('autoprefixer')
  ]
};
