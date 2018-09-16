import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';
import Routes from './Router';
import '../sass/main.scss';

configure({
  enforceActions: true,
});

ReactDOM.render(<Routes />, document.getElementById('root'));
