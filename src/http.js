import config from './config/index.js';
import http from 'node:http';
import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';

import { boot } from './app.js';

async function start() {
  const app = await boot();

  const key = fs.readFileSync(path.resolve() + '/ssl.key');
  const cert = fs.readFileSync(path.resolve() + '/ssl.crt');
  const options = {
    key: key,
    cert: cert,
  };

  const httpServer = http.createServer(app);
  const httpsServer = https.createServer(options, app);

  await new Promise((resolve) => {
    httpServer.listen({ port: config.httpPort }, resolve);
    httpsServer.listen({ port: config.httpsPort }, resolve);
  });

  console.log(`🚀 Server ready at http://localhost:${config.httpPort}`);
  console.log(`🚀 Server ready at https://localhost:${config.httpsPort}`);
}

start();
