import { gql } from 'apollo-server-express';

import Auth from './Auth/index.js';
import AuthToken from './AuthToken/index.js';
import UserAccount from './UserAccount/index.js';

const linkTypeDefs = gql`
  scalar DateTime
  scalar Date
  scalar EmailAddress
  scalar JSON
  scalar JWT
  scalar URL

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;
export default [
  linkTypeDefs,
  Auth.typedef,
  AuthToken.typedef,
  UserAccount.typedef,
];
