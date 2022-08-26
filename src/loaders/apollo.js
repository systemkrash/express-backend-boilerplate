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
