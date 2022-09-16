import { gql } from 'apollo-server-express';

export default gql`
  extend type Mutation {
    authEmail(email: EmailAddress!, password: String): Token!

    authRegister(user: AuthUserAccount): UserAccount

    forgotPassword(email: EmailAddress): Boolean!
    resetPassword(
      resetToken: JWT!
      password: String!
      confirmPassword: String!
    ): Boolean!
  }

  input AuthUserAccount {
    email: EmailAddress!
    password: String!
    confirmPassword: String!
    role: String!
  }
`;
