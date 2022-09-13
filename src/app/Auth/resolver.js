import { combineResolvers } from 'graphql-resolvers';
import { authenticate as authenticateByEmail } from './strategies/local.js';

export default {
  Mutation: {
    authEmail: combineResolvers(authEmail),
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

export async function resetPassword(parent, args, context) {}

// Type
