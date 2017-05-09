webpack = require('webpack');

var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var toolSettings = require('frontend-settings');

// Stylelint plugin
var StyleLintPlugin = require('stylelint-webpack-plugin');

// Styles compiler plugin
var ExtractTextPlugin = require('extract-text-webpack-plugin');

require('es6-promise').polyfill();

const config = {
  entry: './app/index.js',

  output: {
    path: __dirname,
    filename: './app/app.js'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.(png|woff|woff2|ttf|eot|svg)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader'
          },
          {
            loader: 'markdown-loader'
          }
        ]
      }
    ]
  },


  // Specify the resulting CSS filename
  plugins: [
    new ExtractTextPlugin("styles.css"),
  ],

  // Colored output
  stats: {
    colors: true
  },

  // Create Sourcemaps for the bundle
  devtool: 'source-map',

  // Keep proccess running
  watch: true
}

module.exports = config;
