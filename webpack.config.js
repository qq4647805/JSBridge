var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
var webpack=require('webpack');
var ENV = process.env.NODE_ENV || 'development';
(process.env.N==1) && (ENV='production')
module.exports = {
  entry: {
    app:APP_PATH+'/index.js',
  },
  output: {
    path: BUILD_PATH,
    filename: 'lib/JSBridge.min.js',
  },
  module:{
    loaders:[
      {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
      },
    ]
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    colors: true,
    host:'0.0.0.0',
  },
  plugins: ([
    new HtmlwebpackPlugin({
      title: 'test JSBridge',
      // filename:(ENV==='production')?BUILD_PATH+'/index.html':'index.html',
      template:APP_PATH+'/html.ejs',
      // minify: { collapseWhitespace: true }
    }),
	]).concat(ENV==='production' ? [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
		// new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
	] : []),
  stats: { colors: true },
};
