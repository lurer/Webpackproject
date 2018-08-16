import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';
import Routes from './Router';

configure({
  enforceActions: true,
});

ReactDOM.render(<Routes />, document.getElementById('root'));
