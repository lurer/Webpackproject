var webpack = require('webpack');
var config = require('./webpack.config');
var path = require('path');

const SRC_DIR = path.resolve(__dirname, './content/src');
const DIST_DIR = path.resolve(__dirname, './content/dist');


config.entry.bundle = [
    SRC_DIR +'/js/app.jsx', 
    'webpack/hot/only-dev-server', 
    'webpack-dev-server/client?http://0.0.0.0:8080',
    SRC_DIR + '/sass/main.scss'
]

config.output.publicPath = '/static/';
config.output.filename = '[name].js' //will make one file per entry point, using its name

config.devServer = {
    contentBase: DIST_DIR,
    publicPath: '/static/',
    hot: true,
    inline: true,
    historyApiFallback: true,
    // proxy: {
    //   '**': {
    //     target: SERVER,
    //     secure: false,
    //     changeOrigin: true
    //   }
    // }
  }

  config.module.rules.push({
    use:['style-loader', 'css-loader', 'postcss-loader','sass-loader'],
    test: /\.scss$/
})

config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
)

module.exports = config;