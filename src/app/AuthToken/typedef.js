import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    me: UserAccount!
  }

  extend type Mutation {
    refreshToken: Token!
  }

  type AuthToken {
    id: ID!
    token: Token!
    refresh_token: Token!
    browser: String
    platform: String
    ip_address: String
    useraccount_id: ID!
  }

  type Token {
    token: JWT!
  }
`;