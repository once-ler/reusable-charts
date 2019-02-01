const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: ['./src/index.js'],
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
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
  config.entry = ['./example/index.js'];
  config.output = {
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    path: path.resolve(__dirname, 'example')
  };  
}

module.exports = config;
