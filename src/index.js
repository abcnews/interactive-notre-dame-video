import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

const scrollyteller = require('@abcnews/scrollyteller').loadOdysseyScrollyteller('video', 'u-full', 'mark');

// Get rid of the white box below the scrollyteller
if (document.location.href.indexOf('mobile') > -1) {
  scrollyteller.mountNode.style.setProperty('margin-bottom', '-2rem');
} else {
  scrollyteller.mountNode.style.setProperty('margin-bottom', '-3rem');
}

function init() {
  render(<App scrollyteller={scrollyteller} />, scrollyteller.mountNode);
}

init();
