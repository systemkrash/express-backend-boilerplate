import { gql } from 'apollo-server-express';

export default gql`
  extend type Mutation {
    authEmail(email: EmailAddress!, password: String): Token!

    forgotPassword(email: EmailAddress): Boolean!

    resetPassword(
      resetToken: JWT!
      password: String!
      confirmPassword: String!
    ): Boolean!
  }
`;
