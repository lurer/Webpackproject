import React from 'react';
import { Router, hashHistory } from 'react-router';

import Home from './components/Home';


const componentRoutes = {
  component: Home,
  path: '/',
  IndexRoute: { component: Home },
  childRoutes: [
    {
      path: '/article',
      getComponent(location, cb) {
        System.import('./components/Article')
          .then(module => cb(null, module.default));
      },
    },
    {
      path: '/product',
      getComponent(location, cb) {
        System.import('./components/Product')
          .then(module => cb(null, module.default));
      },
    },
  ],
};

const Routes = () => <Router history={hashHistory} routes={componentRoutes} />;

export default Routes;
