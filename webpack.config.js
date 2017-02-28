var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  'react', 'lodash', 'redux', 'react-redux', 'react-dom', 
  'faker','react-input-range', 'redux-form', 'redux-thunk'
];

module.exports = {
  //Two entry points. 
  entry: {
    bundle: './src/index.js', //Our code
    vendor: VENDOR_LIBS //vendor code (dependencies)
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js' //will make one file per entry point, using its name
  },
  module:{
    rules:[
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use:['style-loader', 'css-loader'],
        test: /\.css$/
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
      template: 'src/index.html' //file used as template
    }),

    //Looks for NODE_ENV variable in package.json scripts object.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
