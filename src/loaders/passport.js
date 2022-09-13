import passport from 'passport';

import Auth from '../app/Auth/index.js';

async function passportLoader() {
  passport.use('local-token', Auth.strategy.LocalStrategy);
}

export default passportLoader;
