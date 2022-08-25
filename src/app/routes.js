import { Router } from 'express';

import UserAccount from './UserAccount/index.js';

function routes() {
  const app = Router();

  UserAccount.route(app);

  return app;
}

export default routes;
