import { combineResolvers } from 'graphql-resolvers';

import AuthService from './service.js';
import MailService from '../Mail/service.js';
import mailer from '../../plugins/mailer/index.js';
import { authenticate as authenticateByEmail } from './strategies/local.js';
import UserAccountEvent from '../UserAccount/event.js';
import eventEmitter from '../../utils/eventEmitter.js';

export default {
  Mutation: {
    authEmail: combineResolvers(authEmail),
    authRegister: combineResolvers(authRegister),
    forgotPassword: combineResolvers(forgotPassword),
    resetPassword: combineResolvers(resetPassword),
  },
};

// Query

// Mutation
export async function authEmail(parent, { email, password }, { req, res }) {
  console.log({ email, password });
  req.body = {
    ...req.body,
    email,
    password,
  };

  try {
    return await authenticateByEmail(req, res);
  } catch (ex) {
    throw ex;
  }
}

export async function authRegister(
  parent,
  { user },
  { dataSources: { UserAccountData } }
) {
  const Auth = new AuthService(UserAccountData.model);

  try {
    new MailService(mailer);
    const userAccount = await Auth.createUserAccount(user);

    // emit an event to send verification email
    eventEmitter.emit(UserAccountEvent.USERACCOUNT_CREATED, {
      to: userAccount.email,
      verificationToken: userAccount.verification_token,
    });

    return userAccount;
  } catch (ex) {
    throw ex;
  }
}

export async function forgotPassword(
  parent,
  { email },
  { dataSources: { UserAccountData } }
) {
  const Auth = new AuthService(UserAccountData.model);

  try {
    new MailService(mailer);
    const { email: to, resetPasswordToken } = await Auth.forgotPassword(email);

    console.log({ to, resetPasswordToken });

    // emit an event reset password thru email
    eventEmitter.emit(UserAccountEvent.USERACCOUNT_FORGOTPASSWORD, {
      // change this to real email recepient
      to: 'melvs.evangelista@gmail.com',
      resetPasswordToken,
    });
    return true;
  } catch (ex) {
    throw ex;
  }
}

export async function resetPassword(
  parent,
  { resetToken, password, confirmPassword },
  { dataSources: { UserAccountData } }
) {
  try {
    const Auth = new AuthService(UserAccountData.model);

    const userAccount = await Auth.resetPassword(
      resetToken,
      password,
      confirmPassword
    );

    console.log(userAccount);

    return true;
  } catch (ex) {
    throw ex;
  }
}

// Type
