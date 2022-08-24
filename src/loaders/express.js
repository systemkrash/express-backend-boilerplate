import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import useragent from 'express-useragent';
import requestIp from 'request-ip';

import config from '../config/index.js';

async function expressLoader({ app }) {
  app.set('trust proxy', config.environment !== 'production');

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(
    helmet({
      contentSecurityPolicy:
        config.environment === 'production' ? undefined : false,
      crossOriginEmbedderPolicy: false,
    })
  );
  app.use(useragent.express());
  app.use(requestIp.mw());
}

export default expressLoader;
