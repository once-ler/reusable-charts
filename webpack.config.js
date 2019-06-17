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
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};

if (process.env.NODE_ENV === 'production') {
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
} else {
  
  config.devServer = {
    contentBase: './example',
    port: 4000,
    noInfo: false,
    hot: true,
    inline: true,
    proxy: {
      '/': {
        bypass: function () {
          return '/static/index.html';
        }
      },
      '/log/agg': {
        target: 'http://10.185.38.129:7895',
        pathRewrite: {
          '^/log/agg': '/log/agg'
        },
        secure: false,
        changeOrigin: true
      },
      '/log/wsi': {
        target: 'http://10.185.38.129:7895',
        pathRewrite: {
          '^/log/wsi': '/log/wsi'
        },
        secure: false,
        changeOrigin: true
      },      
    }
  }

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
