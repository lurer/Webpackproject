# An attempt at Webpack configuration
This repo is based on Stephen Griders Webpack tutorial https://www.udemy.com/webpack-2-the-complete-developers-guide/learn/v4/overview
My intent is to add the webpack modules and functionality I would like to use in my future projects, like TypeScript and SASS

## What I want to achieve
* Transform JSX to JS
* Convert SASS to CSS
* Two build types, development and production. 
  * production build should minify files, add map files, and make React production ready by turning off certain react functionality to improve speed.
* Some kind of "hot reload" to build changes and render on the fly.
* Code splitting.
  * Static libraries that rarely change should be compiled to a separate file. This keeps the file easily cachable.
    * Duplicate dependencies will be loaded into the vendor.xxxx.js file one time.
  * User defined code should be the only files that will be reuilt on every save, and will enforce new load from the client.
  * By using *System.import* in the Js-code, separate js files will be generated, and loaded on the fly.
* Use of decorators.
* Use Eslint to conform to best practices in Javascript React, and ES5/6

## Modules in play
The repo uses Webpack together with several other components commonly used. I have tried to add a basic configuration of each of them.

### package.json
Webpack is accessed through package.json script entries. 
* clean: It deletes the **dist** folder.
* build: Runs webpack in "non-production" mode, after running clean first
* build:prod: Same as 'build', but also sets "production" variable and uses the -p flag to make react production ready.
* serve: Runs the Webpack dev server

### .babelrc
Configuration for Babel. It enables es2015 preset and uses the "transform-decorators-legacy" plugin to allow decorators.

### tsconfig.json
The only thing this file is doing is enabling experimentalDecorators. Without this file and configuration, my editor Visual Studio Code complains about the use of decorators, even though they are allowed and works when used.

### .eslintrc
Basically, this configuration I picked up from some blog post, and aside from adding and changing some rules, I have not much knowledge about the parameters. 
Each rule can be specified using 0, 1, or 2 as value, where 0 = "do not use", 1 = "show as warning", 2 = "show as error".

Also, I'm extending AirBnB Eslint [https://www.npmjs.com/package/eslint-config-airbnb]


## Webpack config explanation
TODO :)
