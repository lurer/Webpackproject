import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';


const asyncComponent = getComponent =>
  class AsyncComponent extends React.Component {
    static Component = null
    state = { Component: AsyncComponent.Component };

    componentWillMount = () => {
      if (!this.state.Component) {
        getComponent().then(({ default: Component }) => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      }
    }

    render = () => {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return null;
    }
  };

const PrimaryLayout = () => (

  <div className="container primary-layout">
    <header>
      <Header />
    </header>

    <main>
      <Route path="/" exact component={Home} />
      <Route path="/article" component={asyncComponent(() => import('./components/Article'))} />
      <Route path="/product" component={asyncComponent(() => import('./components/Product'))} />
    </main>
  </div>
);


const Routes = () => (

  <BrowserRouter>
    <PrimaryLayout />
  </BrowserRouter>
);
export default Routes;
