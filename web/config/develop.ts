//node
//import path from 'node:path';
//modules
import unocss from 'unocss/vite';
//stackpress
import { server as http } from '@stackpress/ingest/http';

export type Config = typeof config;

export const config = {
  cwd: process.cwd(),
  env: 'development',
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
      //path.join(process.cwd(), '../frui/frui.css')
    ],
    //vite plugins
    plugins: [ unocss() ]
  }
};

export default async function bootstrap() {
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
  //return the server
  return server;
};