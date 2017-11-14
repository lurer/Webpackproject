import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AsyncComponent from './utilities/AsyncComponent';
import Header from './components/Header';
import Home from './components/Home';


const PrimaryLayout = () => (

  <div className="container primary-layout">
    <header>
      <Header />
    </header>

    <main>
      <Route path="/" exact component={Home} />
      <Route path="/article" component={AsyncComponent(() => import('./components/Article'))} />
      <Route path="/product" component={AsyncComponent(() => import('./components/Product'))} />
    </main>
  </div>
);


const Routes = () => (

  <BrowserRouter>
    <PrimaryLayout />
  </BrowserRouter>
);
export default Routes;
