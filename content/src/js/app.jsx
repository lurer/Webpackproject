import React from 'react';
import ReactDOM from 'react-dom';
import { useStrict } from 'mobx';

import Home from './components/Home';

useStrict(true);

ReactDOM.render(<Home />, document.getElementById('root'));
