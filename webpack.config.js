webpack = require('webpack');

var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var toolSettings = require('frontend-settings');
var jsonImporter = require('node-sass-json-importer');

// Stylelint plugin
var StyleLintPlugin = require('stylelint-webpack-plugin');

// Styles compiler plugin
var ExtractTextPlugin = require('extract-text-webpack-plugin');

require('es6-promise').polyfill();

const config = {
  entry: {
    app: './app/index.js'
  },

  output: {
    path: __dirname,
    filename: './dist/[name].bundle.js'
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader?sourceMap',
          ],
          publicPath: '/css/',
        }),
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
            loader: 'url-loader?limit=10000'
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
    new ExtractTextPlugin('dist/garba-styleguide.css'),
    new webpack.LoaderOptionsPlugin({
      options: {
        sassLoader: {
          importer: jsonImporter,
        },
        context: __dirname,
      },
    }),
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
