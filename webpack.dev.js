var webpack = require('webpack');
var config = require('./webpack.config');
var path = require('path');

const SRC_DIR = path.resolve(__dirname, './content/src');
const DIST_DIR = path.resolve(__dirname, './content/dist');


config.entry.bundle = [
    SRC_DIR + '/js/app.jsx',
    SRC_DIR + '/sass/main.scss'
]

config.output.publicPath = '/'; //Want to use the same dir as the production config.
config.output.filename = '[name].js' //will make one file per entry point, using its name

config.devServer = {
    publicPath: '/',    //Want to use the same dir as the production config.
    hot: true,
    inline: true,
    historyApiFallback: true
}

config.module.rules.push({
    use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
    test: /\.scss$/
})

config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
)

module.exports = config;