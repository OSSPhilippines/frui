//node
import path from 'node:path';
//modules
import unocss from 'unocss/vite';
//stackpress
import { server as http } from '@stackpress/ingest/http';

export type Config = typeof config;

export const cwd = process.cwd();
export const docs = path.join(cwd, 'docs');
export const build = path.join(cwd, 'node_modules', '.reactus');

export const config = {
  cwd: process.cwd(),
  env: 'production',
  view: {
    //path where to save assets (css, images, etc)
    assetPath: path.join(docs, 'assets'),
    //path where to save the client scripts (js)
    clientPath: path.join(docs, 'client'),
    //path where to save the server scripts (js)
    pagePath: build,
    //filepath to a global css file
    cssFiles: [ 
      'virtual:uno.css',
      //'react-toastify/dist/ReactToastify.css',
      //path.join(process.cwd(), '../frui/frui.css')
    ],
    //vite plugins
    plugins: [ unocss() ],
    //original vite options (overrides other settings related to vite)
    vite: undefined
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