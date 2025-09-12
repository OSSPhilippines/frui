import { server } from '@stackpress/ingest/http';

async function main() {
  const app = server();
  //set config
  app.config.set({
    env: process.env.SERVER_ENV || 'development',
    cwd: process.cwd()
  });
  //load the plugins
  await app.bootstrap();
  //initialize the plugins
  await app.resolve('config');
  //add events
  await app.resolve('listen');
  //add routes
  await app.resolve('route');
  //start the server
  app.create().listen(3000, () => {
    console.log('Server is running on port 3000');
    console.log('------------------------------');
  });
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});

