import { readFile } from 'node:fs/promises';
import swaggerUi from 'swagger-ui-express';

import config from '../config/index.js';

async function swaggerLoader({ app }) {
  if (config.environment !== 'production') {
    const swaggerFile = JSON.parse(
      await readFile(new URL('../../swagger.json', import.meta.url))
    );

    app.use('/rest-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
  }
}

export default swaggerLoader;
