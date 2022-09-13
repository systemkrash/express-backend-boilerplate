import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginInlineTrace,
  ApolloServerPluginInlineTraceDisabled,
} from 'apollo-server-core';

import config from '../config/index.js';
import App from '../app/index.js';

const { typeDefs, resolvers, datasources, models } = App;

async function apolloLoader({ app }) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      AuthTokenData: new datasources.AuthToken(models.AuthToken),
      UserAccountData: new datasources.UserAccount(models.UserAccount),
    }),
    context: async ({ req, res }) => {
      if (req) {
        return { req, res };
      }
    },
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      config.environment !== 'production'
        ? ApolloServerPluginInlineTrace()
        : ApolloServerPluginInlineTraceDisabled(),
    ],
    stopOnTerminationSignals: true,
    // flatten the data response but will violate the GraphQL Spec
    // so wrap a comment this is user preference
    // see http://spec.graphql.org/June2018/#sec-Response-Format
    // see possible issues on this https://stackoverflow.com/questions/57789077/graphql-just-return-raw-data
    // formatResponse: (res, context) => {
    //   if (
    //     (context.operation.operation === 'query' ||
    //       context.operation.operation === 'mutation') &&
    //     context.operationName !== 'IntrospectionQuery'
    //   ) {
    //     if (res.data) {
    //       res.data = res.data[Object.keys(res.data)[0]];
    //     }
    //   }

    //   return res;
    // },
  });

  await server.start();

  server.applyMiddleware({
    app,
    path: config.api.graphQLPrefix,
    cors: false,
  });

  return server;
}

export default apolloLoader;
