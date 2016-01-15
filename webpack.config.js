'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    browser: [
      'webpack-hot-middleware/client?reload=true',
      path.join(__dirname, 'app/App.js')
    ],
    ieCompatible: path.join(__dirname, 'app/utils/ie-compatible.js'),
    mobile: [
      'webpack-hot-middleware/client?reload=true',
      path.join(__dirname, 'app/App-h5.js')
    ]
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      filename: 'index.html',
      chunks: ['browser', 'ieCompatible']
    }),
    new HtmlWebpackPlugin({
      template: 'app/index-h5.html',
      inject: 'body',
      filename: 'index-h5.html',
      chunks: ['mobile']
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel'
    },{
      test: /\.js?$/,
      exclude: /[node_modules|lib]/,
      loader: 'eslint'
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
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
  }
};
