//node
import path from 'node:path';
import Terminal from '@stackpress/lib/Terminal';
//modules
import unocss from 'unocss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
//stackpress
import { server as http } from '@stackpress/ingest/http';

type Config = typeof config;

const cwd = process.cwd();
const config = {
  cwd,
  env: 'development',
  assets: path.join(cwd, 'public'),
  view: {
    //base path (used in vite)
    basePath: '/',
    //client script route prefix used in the document markup
    //ie. /client/[id][extname]
    //<script type="module" src="/client/[id][extname]"></script>
    //<script type="module" src="/client/abc123.tsx"></script>
    clientRoute: '/client',
    //filepath to a global css file
    cssFiles: [ 
      'virtual:uno.css',
      //'react-toastify/dist/ReactToastify.css',
      path.join(cwd, 'frui.css')
    ],
    //vite plugins
    plugins: [ unocss(), tsconfigPaths() ]
  }
};

async function main() {
  const cli = new Terminal([]);
  //make a server
  const server = http<Config>();
  //set config
  server.config.set(config);
  //load the plugins
  await server.bootstrap();
  //initialize the plugins
  await server.resolve('config');
  //add events
  await server.resolve('listen');
  //add routes
  await server.resolve('route');
  //start the server
  server.create().listen(3000, () => {
    cli.control.system('Server is running on port 3000');
    cli.control.system('------------------------------');
  });
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});

