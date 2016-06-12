'use strict';

import '!style!css!less!./styles/index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';

const root = document.getElementsByTagName('root')[0];
ReactDOM.render(<Root/>, root);
