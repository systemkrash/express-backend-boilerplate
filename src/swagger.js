import { boot } from './app.js';
import { openApi } from './loaders/sofa.js';

async function start() {
  await boot();

  openApi.save('./swagger.json');
  console.log('Successfully generated swagger.json file')

  process.exit(0);
}

start();
