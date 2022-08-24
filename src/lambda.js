import serverlessExpress from '@vendia/serverless-express';

import { boot } from './app.js';

let serverlessExpressInstance;

async function start(event, context) {
  const app = await boot();

  serverlessExpressInstance = serverlessExpress({ app });

  return serverlessExpressInstance(event, context);
}

export function handler(event, context) {
  if (serverlessExpressInstance)
    return serverlessExpressInstance(event, context);

  return start(event, context);
}
