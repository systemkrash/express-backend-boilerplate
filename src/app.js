import config from './config/index.js';
import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import express from 'express';

import loaders from './loaders/index.js';

async function boot() {
  const app = express();

  console.log('init called');

  await loaders.init({ expressApp: app });

  return app;
}

export { boot };
