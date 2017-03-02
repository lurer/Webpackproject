var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const SRC_DIR = path.resolve(__dirname, './content/src');
const DIST_DIR = path.resolve(__dirname, './content/dist');

const VENDOR_LIBS = [
  'react', 'lodash', 'react-dom', 'faker'
];



module.exports = [{
  //Two entry points. 
  entry: {
    bundle: SRC_DIR +'/js/app.jsx', //Our code
    vendor: VENDOR_LIBS //vendor code (dependencies)
  },
  name: 'js',
  output: {
    path: DIST_DIR,
    filename: '[name].[chunkhash].js' //will make one file per entry point, using its name
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
  plugins:[

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
  ]
},
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
  plugins:[
      new ExtractTextPlugin('[name].css')
  ]
}];
