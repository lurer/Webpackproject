import React from 'react';
import { observer } from 'mobx-react';
import Header from './Header';

const Home = observer(({ children }) =>
  <div className="container">
    <Header />
    {children}
  </div>,
);

export default Home;
