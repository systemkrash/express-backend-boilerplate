import passport from 'passport';
import { Strategy } from 'passport-local';
import { AuthenticationError } from 'apollo-server-errors';

import AuthService from '../service.js';
import UserAccountModel from '../../UserAccount/model.js';
import AuthTokenService from '../../AuthToken/service.js';
import AuthTokenModel from '../../AuthToken/model.js';
import MailService from '../../Mail/service.js';
import MailerPlugin from '../../../plugins/mailer/index.js';
import eventEmitter from '../../../utils/eventEmitter.js';

export default new Strategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const Auth = new AuthService(UserAccountModel);

      const userAccount = await Auth.loginAsEmail(email, password);

      return done(null, userAccount);
    } catch (ex) {
      return done(ex, false);
    }
  }
);

export const authenticate = (req, res) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('local-token', async (err, userAccount) => {
      console.log('passport authenticate called');
      if (err) {
        reject(err);
      }

      if (userAccount === false) {
        return reject(new AuthenticationError('Invalid password'), false);
      }

      const AuthToken = new AuthTokenService(AuthTokenModel);

      const token = await AuthToken.insertToken(
        req.useragent.browser,
        req.useragent.platform,
        req.clientIp,
        userAccount.id
      );

      // const Mail = new MailService(MailerPlugin);

      // eventEmitter.emit('useraccount.test-email', {
      //   to: 'melvs.evangelista@gmail.com',
      // });

      return resolve({ token });
    })(req, res);
  });
};
