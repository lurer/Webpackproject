# An attempt at Webpack and React configuration
This repo is based on Stephen Griders Webpack tutorial https://www.udemy.com/webpack-2-the-complete-developers-guide/learn/v4/overview
My intent is to add the webpack modules and functionality I would like to use in my future projects, like TypeScript and SASS

## Key features
* Transform JSX to JS
* Convert SASS to CSS
* Two webpack build configurations: 
  * Developement: 
    * Webpack dev-server with Hot Reload
  * Production: 
    * Compile to production ready React code.
    * Minified and uglified files for optimized file size.
  * Common for both configurations:
    * Code splitting; Static libraries that rarely change should be compiled to a separate file. This keeps the file easily cachable.
    * Duplicate dependencies will be loaded into the vendor.xxxx.js file one time.
    * User defined code should be the only files that will be rebuilt on every save, and will enforce new load from the client.
    * By using *import* in the Js-code, separate js files will be generated, and loaded on the fly.
* Use Eslint to conform to best practices in Javascript React, and ES6
* Using PostCSS to enable Autoprefixer, which adds Browser specific CSS rules all places it has analyzed that a browser specific rule is needed. This could be enabled directly, using the Prefixer package, but PostCSS also brings moreto the table if it is needed later on.

## Configuration files
The project uses Webpack together with several other modules commonly used. I have tried to add a basic configuration of each of them.

### package.json
Webpack is accessed through package.json script entries. 
* clean: It deletes the **dist** folder.
* build: Sets "production" variable and uses the -p flag to make react production ready.
* serve: Runs the Webpack dev server. runs 'clean' task first, so that dev files do not conflict with previously generated production files. I tried using devserver publicPath, but I never found it to be practical.

### .babelrc
Configuration for Babel. It enables es2015 preset and uses the "transform-decorators-legacy" plugin to allow decorators.

### tsconfig.json
The only thing this file is doing is enabling experimentalDecorators. Without this file and configuration, my editor Visual Studio Code complains about the use of decorators, even though they are allowed and works when used.

### .eslintrc
Basically, this configuration I picked up from some blog post, and aside from adding and changing some rules, I have not much knowledge about the parameters. 
Each rule can be specified using 0, 1, or 2 as value, where 0 = "do not use", 1 = "show as warning", 2 = "show as error".

Also, I'm extending AirBnB Eslint [https://www.npmjs.com/package/eslint-config-airbnb]


## Webpack config
To keep the webpack config clean I have split the config into 3 files, where the npm command for running webpack specifies which config files that should be used.

**webpack.config.js** contains the common configuration for both production and development use cases.

`VENDOR_LIBS` lists the packages that are static, and rarely changing. An entry is added for these packages, so that all those packages are loaded into a *vendor.js* file. As these packages rarely changes, it is a higher chance that this file will be cached in the user's browsers.

`devtool` is dependent on the *NODE_ENV* variable. If in production source maps are generated. If in development, devtool is set to *eval* which is much faster.


```javascript
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
```
