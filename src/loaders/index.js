import mongooseLoader from './mongoose.js';
import expressLoader from './express.js';
import apolloLoader from './apollo.js';
import passportLoader from './passport.js';
import sofaLoader from './sofa.js';
import swaggerLoader from './swagger.js';

async function init({ expressApp }) {
  const mongodb = await mongooseLoader();
  console.log('MongoDB Connected');

  const express = await expressLoader({ app: expressApp });
  console.log('Express Initialized');

  const apollo = await apolloLoader({ app: expressApp });
  await passportLoader();
  console.log('Apollo GraphQL Initialized');

  const sofa = await sofaLoader({ app: expressApp });
  console.log('Sofa REST API Initialized');

  let swagger = await swaggerLoader({ app: expressApp });

  return {
    mongodb,
    app: express,
    apollo,
    sofa,
    swagger,
  };
}

export default { init };
