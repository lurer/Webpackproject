import React from 'react';
import ReactDOM from 'react-dom';
import * as mobx from 'mobx';
import Routes from './Router';

mobx.useStrict(true);

ReactDOM.render(<Routes />, document.getElementById('root'));
