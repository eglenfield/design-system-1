import React from 'react';
import { render } from 'react-dom';

import App from './components/App';
import ButtonStyleguide from '../../src/components/Button/styleguide';
import './index.css';

if (module.hot) {
  module.hot.accept();
}

const components = [
  {
    path: '/components/button',
    name: 'Button',
    Component: ButtonStyleguide,
  },
];

render(<App components={components} />, document.getElementById('root'));
