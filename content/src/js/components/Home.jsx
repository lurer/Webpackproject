import React from 'react';
import { observer } from 'mobx-react';

const Home = observer(({ children }) =>
  <div>
    <h1>Home</h1>
    {children}
  </div>
);

export default Home;
