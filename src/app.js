import express from 'express';

import config from './config/index.js';
import loaders from './loaders/index.js';

import App from './app/index.js';

async function boot() {
  const app = express();

  await loaders.init({ expressApp: app });

  /**
   * Load Health Check endpoints
   */
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  /**
   * Load REST API endpoints
   */
  app.use(config.api.restPrefix, App.routes());

  return app;
}

export { boot };
