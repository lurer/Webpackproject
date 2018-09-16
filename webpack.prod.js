const config = require('./webpack.config');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const SRC_DIR = path.resolve(__dirname, './content/src');
const DIST_DIR = path.resolve(__dirname, './content/dist');

config.output.filename = '[name].[chunkhash].js' //will make one file per entry point, using its name

config.devtool = 'source-map';

config.plugins.push(
    new ExtractTextPlugin({
        filename: '[name].css',
        allChunks: true
    }),
    new OptimizeCssAssetsPlugin()
)

config.optimization["minimizer"] = [
    new UglifyJsPlugin({
        test: /\.js($|\?)/i,
        uglifyOptions: {
            compress: {
                warnings: false,
                dead_code: true,
                unused: true
            }
        },
        sourceMap: true
    })
]

config.module.rules.push(
    {
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader?sourceMap!postcss-loader?sourceMap!sass-loader?sourceMap'
        }),
        test: /\.(scss|css)$/
    }
)



module.exports = config;