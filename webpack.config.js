var path = require("path");
var webpack = require('webpack');

module.exports = {
  entry: {
    app: 'app',
  },
  output: {
    filename: "./[name].bundle.js",
    sourceMapFilename: "./[name].bundle.map"
  },
  devtool: '#source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    })
  ],
  module: {
    loaders: [
      {
        loader: 'babel',
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['react', 'es2015', 'stage-2']
        }
      }
    ]
  },
  resolve: {
    root: path.resolve('./src/'),
    extensions: ['', '.js']
  }
}