import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { hashHistory } from 'react-router';

import Header from './components/Header';
import Home from './components/Home';
import Article from './components/Article';
import Product from './components/Product';


const PrimaryLayout = () => (

  <div className="container primary-layout">
    <header>
      <Header />  
    </header>
    
    <main>
      <Route path="/" exact component={Home}/>
      <Route path="/article" component={Article}/>
      <Route path="/product" component={Product}/>
    </main>
  </div>
);


const Routes = () => (

  <BrowserRouter>
    <PrimaryLayout />    
  </BrowserRouter>
)
export default Routes;
