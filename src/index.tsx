import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { fetchCurrencies } from './core/models/converter';

fetchCurrencies('EUR');

ReactDOM.render(<App />, document.getElementById('root'));
