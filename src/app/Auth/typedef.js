import { gql } from 'apollo-server-express';

export default gql`
  extend type Mutation {
    authEmail(email: EmailAddress!, password: String): Token!

    resetPassword(
      resetToken: JWT!
      password: String!
      passwordConfirm: String!
    ): Boolean!
  }
`;
