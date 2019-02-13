const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const cssnano = require('cssnano');

const config = {
  entry: ['./src/index.js'],
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({fallback: 'style-loader',
          use: [{ loader: 'css-loader', options: { minimize: false } }]
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg|ttf|eot|woff2?)$/i,
        loader: 'url-loader'
      }
    ]
  },
  resolve: {
    alias: {
     'crossfilter': 'crossfilter2'
    }
  },
  output: {
    library: 'ReusableCharts',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
    new HtmlWebpackPlugin({
      title: 'reusable-charts',
      filename: 'index.html',
      template: 'static/index.html',
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    // new webpack.optimize.UglifyJsPlugin({ compressor: { warnings: false } })
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
  )
} else {
  
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    }),
    new ExtractTextPlugin('[name]-[chunkhash].css'),
    new OptimizeCssAssetsPlugin({
      // assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: cssnano,
      cssProcessorOptions: {
        safe: true,
        discardComments: {
          removeAll: true,
        },
      },
    })
  )
  
  config.entry = ['./example/index.js'];
  config.output = {
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  };  
}

module.exports = config;
