'use strict';

const webpack = require('webpack');
const config = require('config');
const path = require('path');

const {DefinePlugin} = webpack;
const {UglifyJsPlugin} = webpack.optimize;
const isDev = !!~process.argv.indexOf('--dev');

const prefix = '/api';
const proxy = {
  [`${prefix}*`]: {
    target: `http://${config.get('api')}`,
    secure: false,
    bypass: req => {
      req.url = req.url.substr(prefix.length, req.url.length);
      return false;
    }
  }
};

module.exports = {
  entry: [
    'index.js',
    'file?name=index.html!index.html'
  ],
  output: {
    path: './dist',
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.js.map'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.png$/,
      loader: 'file!img',
      exclude: /node_modules/
    }, {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/octet-stream'
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file'
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=image/svg+xml'
    }]
  },
  resolveLoader: {
    alias: {
      'template': 'html'
    }
  },
  resolve: {
    root: [path.join(__dirname, 'src')]
  },
  plugins: isDev ? [] : [
    new UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
  devServer: {
    proxy,
    port: config.get('http.port'),
    historyApiFallback: true
  }
};
