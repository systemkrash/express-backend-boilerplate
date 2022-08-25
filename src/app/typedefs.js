import { gql } from 'apollo-server-express';

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
export default [linkTypeDefs];
