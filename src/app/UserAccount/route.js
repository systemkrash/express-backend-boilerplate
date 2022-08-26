import { Router } from 'express';

import UserAccountService from './service.js'

const route = Router();

function routes(app) {
  app.use('/UserAccounts', route);

  route.get('/', async (req, res) => {
    return res.json({ useraccounts: [] }).status(200);
  });

  route.get('/test', async (req, res) => {
    const UserAccount = new UserAccountService();

    await UserAccount.test();

    return res.json({ result: 'Testing PubSub Event' });
  });

  route.get('/tests', async (req, res) => {
    const UserAccount = new UserAccountService();

    await UserAccount.test();

    return res.json({ result: 'Testing PubSub Event' });
  });
}

export default routes;
