import { Router } from 'express';

const route = Router();

function routes(app) {
  app.use('/UserAccounts', route);

  route.get('/', async (req, res) => {
    return res.json({ useraccounts: [] }).status(200);
  });
}

export default routes;
