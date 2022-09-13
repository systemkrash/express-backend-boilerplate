import { combineResolvers } from 'graphql-resolvers';
import UserAccountService from './service.js';

export default {
  Query: {
    findUserAccounts: combineResolvers(findUserAccounts),
    findByIdUserAccount: combineResolvers(findByIdUserAccount),
  },
  Mutation: {
    createUserAccount: combineResolvers(createUserAccount),
  },
  UserAccount: {},
};

// Query
export async function findUserAccounts(
  parent,
  args,
  { dataSources: { UserAccountData } }
) {
  const UserAccount = new UserAccountService(UserAccountData.model);

  return await UserAccount.find();
}

export async function findByIdUserAccount(parent, {id}, {dataSources: {UserAccountData}}) {
  const UserAccount = new UserAccountService(UserAccountData.model);

  return await UserAccount.findById(id);
}

// Mutation
export async function createUserAccount(
  parent,
  { email, password },
  { dataSources: { UserAccountData } }
) {
  const UserAccount = new UserAccountService(UserAccountData.model);
  const newUserAccount = await UserAccount.register({ email, password });

  return newUserAccount;
}

// Type
