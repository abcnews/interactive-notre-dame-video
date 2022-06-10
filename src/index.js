import { whenOdysseyLoaded } from '@abcnews/env-utils';
import { loadScrollyteller } from '@abcnews/scrollyteller';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

whenOdysseyLoaded.then(() => {
  const scrollyteller = loadScrollyteller('video', 'u-full');

  render(<App scrollyteller={scrollyteller} />, scrollyteller.mountNode);
});
