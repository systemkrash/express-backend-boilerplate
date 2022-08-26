import { combineResolvers } from 'graphql-resolvers';

export default {
  Query: {
    findUserAccounts: combineResolvers(findUserAccounts),
  },
  Mutation: {
    createUserAccount: combineResolvers(createUserAccount),
  },
  UserAccount: {},
};

// Query
export async function findUserAccounts(parent, args, context) {
  return [{ id: 1, email: 'email@address.com' }];
}

// Mutation
export async function createUserAccount(parent, { email, password }, context) {
  return { id: 2, email };
}

// Type
