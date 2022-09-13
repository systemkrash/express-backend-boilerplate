import { combineResolvers } from 'graphql-resolvers';
import AuthTokenService from './service.js';
import UserAccountService from '../UserAccount/service.js';

export default {
  Query: {
    me: combineResolvers(me),
  },
  Mutation: {
    refreshToken: combineResolvers(refreshToken),
  },
};

// Query
export async function me(
  parent,
  args,
  { req, dataSources: { AuthTokenData, UserAccountData } }
) {
  try {
    const AuthToken = new AuthTokenService(AuthTokenData.model);
    const UserAccount = new UserAccountService(UserAccountData.model);

    const token = req.headers['authorization'];
    const userAccountToken = await AuthToken.verifyToken(token);

    const userAccount = await UserAccount.findById(
      userAccountToken.useraccount_id
    );

    return userAccount;
  } catch (ex) {
    throw ex;
  }
}
// end Query

// Mutation
export async function refreshToken(
  parent,
  args,
  { req, dataSources: { AuthTokenData } }
) {
  const AuthToken = new AuthTokenService(AuthTokenData.model);

  const token = req.headers['authorization'];

  try {
    const clientToken = await AuthToken.refreshClientToken(token, {
      browser: req.useragent.browser,
      platform: req.useragent.platform,
      ip_address: req.clientIp,
    });

    return clientToken;
  } catch (ex) {
    throw ex;
  }
}
// end Mutation
