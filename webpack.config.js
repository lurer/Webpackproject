var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC_DIR = path.resolve(__dirname, './content/src');
const DIST_DIR = path.resolve(__dirname, './content/dist');

//VENDOR_LIBS is the libraries that rarely changes and are put in vendor....js file
const VENDOR_LIBS = [
  'react', 'lodash', 'react-dom', 'react-router', 'react-router-dom', 'mobx', 'mobx-react'
];

const PROD = (process.env.NODE_ENV === 'production');



module.exports = {
  
  entry: {
    vendor: VENDOR_LIBS //vendor code (dependencies)
  },
  devtool: PROD ? 'source-map': 'eval',
  output: {
    path: DIST_DIR,
  },
  resolve:{
    extensions:['.js', '.jsx'] //remove the need to import using .jsx extensions
  },
  module:{
    rules:[
      {//loading eslint before babel-loader. 
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: SRC_DIR,
        use: 'eslint-loader'
      },
      {
        use: 'babel-loader',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: SRC_DIR
      }
    ]
  },
  optimization:{
      splitChunks:{
          cacheGroups:{
              vendor:{
                  chunks: 'all',
                  name: 'vendor',
                  test: 'vendor',
                  enforce: true
              }
          }
      }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    //Will automatically add all script files generated into an index.html in dist folder
    new HtmlWebpackPlugin({
      template: SRC_DIR +'/index.html' //file used as template
    }),

    //Postcss import to implement cssnext. Enables Autoprefixer as it is part of cssnext.
    new webpack.LoaderOptionsPlugin({
        options: {
            context: SRC_DIR,
            postcss: [ // <---- postcss configs go here under LoadOptionsPlugin({ options: { ??? } })
                require('postcss-cssnext')
            ]
        }
    })
  ]
}