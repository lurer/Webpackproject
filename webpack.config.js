var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const SRC_DIR = path.resolve(__dirname, './content/src');
const DIST_DIR = path.resolve(__dirname, './content/dist');

//VENDOR_LIBS is the libraries that rarely changes and are put in vendor....js file
const VENDOR_LIBS = [
  'react', 'lodash', 'react-dom', 'faker'
];

const PROD = (process.env.NODE_ENV === 'production');



/////////////////////// Plugins for Javascript ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
getJSPlugins = () =>{
  let plugins = [];

  plugins.push(
    //will find duplicate depdendencies and add to vendor bundle
    new webpack.optimize.CommonsChunkPlugin({ 
      names: ['vendor', 'manifest']
    }),
    //Will automatically add all script files generated into an index.html in dist folder
    new HtmlWebpackPlugin({
      template: SRC_DIR +'/index.html' //file used as template
    }),
    //Looks for NODE_ENV variable in package.json scripts object.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  )
  if(PROD){
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
        compress: {warnings: false},
        minimize:true,
        sourceMap: true
      })
    )
  }
  return plugins;
}


///////////////////////// Plugins for CSS ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
getCSSPlugins = () =>{
  plugins = [];
      plugins.push(new ExtractTextPlugin('[name].css'))
      if(PROD){
        plugins.push(new OptimizeCssAssetsPlugin())
      }
      return plugins;
}


/////////////////////////// Webpack config ///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
module.exports = [{
  
  ///////////////////////// Javascript part /////////////////////////////////////////
  entry: {
    bundle: SRC_DIR +'/js/app.jsx', //Our code
    vendor: VENDOR_LIBS //vendor code (dependencies)
  },
  name: 'js',
  devtool: 'source-map',
  output: {
    path: DIST_DIR,
    filename: PROD ?'[name].[chunkhash].min.js' : '[name].[chunkhash].js' //will make one file per entry point, using its name
  },
  module:{
    rules:[
      {
        use: 'babel-loader',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: SRC_DIR
      }
    ]
  },
  plugins: getJSPlugins()
},

/////////////////////////////// CSS part /////////////////////////////////////////
{
  entry: SRC_DIR + '/sass/main.scss',
  name: 'css',
  output:{
    path: DIST_DIR,
    filename: '[name].css'
  },
  module:{
    rules:[
      {
        //use:['style', 'css?sourceMap', 'sass?sourceMap'],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use:'css-loader?sourceMap!sass-loader?sourceMap'
        }),
        test: /\.scss$/
      }
    ]
  },
  plugins: getCSSPlugins()
}];
