import { useSofa, OpenAPI } from 'sofa-api';
import { makeExecutableSchema } from '@graphql-tools/schema';

import App from '../app/index.js';
import config from '../config/index.js';

const { typeDefs, resolvers, datasources, models } = App;
const schema = makeExecutableSchema({ typeDefs, resolvers });

const openApi = OpenAPI({
  schema,
  info: {
    title: 'Divinety REST API',
    version: '1.0.0',
  },
});

async function sofaLoader({ app }) {
  app.use(
    config.api.restPrefix,
    useSofa({
      basePath: config.api.restPrefix,
      schema,
      async context({ req, res }) {
        if (req) {
          return {
            req,
            res,
            dataSources: {
              AuthTokenData: new datasources.AuthToken(models.AuthToken),
              UserAccountData: new datasources.UserAccount(models.UserAccount),
            },
          };
        }
      },
      onRoute(info) {
        openApi.addRoute(info, {
          basePath: config.api.restPrefix,
        });
      },
    })
  );
}

export { openApi };
export default sofaLoader;
