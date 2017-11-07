var webpack = require('webpack');
var config = require('./webpack.config');
var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const SRC_DIR = path.resolve(__dirname, './content/src');
const DIST_DIR = path.resolve(__dirname, './content/dist');

config.entry.bundle = [SRC_DIR +'/js/app.jsx', SRC_DIR + '/sass/main.scss'] //Our code
config.output.filename = '[name].[chunkhash].js' //will make one file per entry point, using its name

config.module.rules.push(
    {
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use:'css-loader?sourceMap!postcss-loader?sourceMap!sass-loader?sourceMap'
        }),
        test: /\.scss$/
    }
)

config.plugins.push(
    //will find duplicate depdendencies and add to vendor bundle
    new webpack.optimize.CommonsChunkPlugin({ 
      names: ['vendor', 'manifest']
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {warnings: false},
        minimize:true,
        sourceMap: true
    }),
    new ExtractTextPlugin('[name].css'),
    new OptimizeCssAssetsPlugin()
)


module.exports = config;