import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    findUserAccounts: [UserAccount]
    findByIdUserAccount(id: ID!): UserAccount
  }

  extend type Mutation {
    createUserAccount(email: EmailAddress!, password: String!): UserAccount!
    verifyUserAccountEmail(verification_token: JWT): UserAccount!
    deleteUserAccount(id: ID!): Boolean
    deleteUserAccounts(ids: [ID!]): Boolean
  }

  type UserAccount {
    id: ID!
    email: EmailAddress!
    facebook_id: String
    google_id: String
    status: String
    reset_password_token: JWT
    is_verified: Boolean
    created_at: DateTime
    updated_at: DateTime
  }
`;
