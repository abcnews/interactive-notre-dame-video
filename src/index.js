import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

const scrollyteller = require('@abcnews/scrollyteller').loadOdysseyScrollyteller('video', 'u-full', 'mark');

function init() {
  render(<App scrollyteller={scrollyteller} />, scrollyteller.mountNode);
}

init();
