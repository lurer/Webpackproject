import React from 'react';
import ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import Routes from './Router';

useStrict(true);

ReactDOM.render(<Routes />, document.getElementById('root'));
