'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
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
    filename: '[name]-[chunkhash].min.js'
  },
  resolve: {
    modulesDirectories: ['node_modules'],
  },
  plugins: [
    new clean(['dist']),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common-[chunkhash].min.js',
      chunks: ['browser', 'mobile']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: 'manifest-[chunkhash].min.js',
      chunks: ['common']
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: 'app/index.html',
      filename: 'index.html',
      chunks: ['common', 'browser', 'ieCompatible'],
      chunksSortMode: function(chunk1, chunk2){
        return chunk1.id - chunk2.id;
      },
      minify: {
        collapseWhitespace: true,
        processConditionalComments: true
      }
    }),
    new HtmlWebpackPlugin({
      template: 'app/index-h5.html',
      filename: 'index-h5.html',
      chunks: ['common', 'mobile'],
      chunksSortMode: function(chunk1, chunk2){
        return chunk1.id - chunk2.id;
      },
      minify: {
        collapseWhitespace: true
      }
    }),
    new InlineManifestWebpackPlugin(),
    new ExtractTextPlugin('[name]-[contenthash].min.css'),
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
    },{
      test: /\.js?$/,
      exclude: /[node_modules|lib]/,
      loader: 'eslint'
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
