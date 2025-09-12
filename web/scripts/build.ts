//node
import fs from 'node:fs/promises';
import path from 'node:path';
//modules
import type Server from '@stackpress/ingest/Server';
import type { BuildStatus } from 'reactus/types';
import Terminal from '@stackpress/lib/Terminal';
//src
import type { ViewPlugin } from '../plugins/app/types.js';
import type { Config } from '../config/build.js';
import bootstrap, { docs } from '../config/build.js';

async function build() {
  const server = await bootstrap();
  const cwd = server.config.path('cwd', process.cwd());
  const cli = new Terminal([]);
  
  cli.control.system('Copying public to docs...');
  await fsCopyFolder(path.join(cwd, 'public'), docs);

  cli.control.system('Building pages, client and styles...');
  await buildStatic(server, cli);

  cli.control.system('Generating markup in docs...');
  const ignore = Array.from(server.action.expressions.keys());
  const routes = Array.from(server.routes.entries()).filter(
    ([ event ]) => !ignore.includes(event)
  );
  for (const [ event, route ] of routes) {
    const request = server.request({
      url: new URL(`https://frui.js.org${route.path}`),
    });
    cli.control.system(`Generating ${request.url.href} ...`);
    const response = await server.resolve(event, request);
    if (response.results) {
      const routepath = route.path.replace(/^\//, '');
      const filepath = routepath === '' ? 'index.html' : `${routepath}.html`;
      await fsWriteFile(
        path.join(docs, filepath),
        response.results as string
      )
    }
  }
};

export async function buildStatic(
  server: Server<any, any, any>,
  cli?: Terminal
) {
  //reactus config
  const config = server.config.get<Config['view']>('view');
  const engine = server.plugin<ViewPlugin>('reactus');

  //add views
  //event -> [ ...{ entry, priority } ]
  for (const views of server.views.values()) {
    for (const view of views) {
      await engine.set(view.entry);
    }
  }

  if (engine.size === 0) {
    return [];
  }

  const responses: BuildStatus[] = [];
  if (config.clientPath) {
    cli && cli.control.system('Building clients...');
    responses.push(await engine.buildAllClients() as BuildStatus);
    cli && cli.control.success('Clients built.');
  }
  if (config.assetPath) {
    cli && cli.control.system('Building assets...');
    responses.push(await engine.buildAllAssets() as BuildStatus);
    cli && cli.control.success('Assets built.');
  }
  if (config.pagePath) {
    cli && cli.control.system('Building pages...');
    responses.push(await engine.buildAllPages() as BuildStatus);
    cli && cli.control.success('Pages built.');
  }

  return responses.map(response => {
    const results = response.results;
    if (typeof results?.contents === 'string') {
      results.contents = results.contents.substring(0, 100) + ' ...';
    }
    return results;
  });
};

async function fsWriteFile(file: string, data: string) {
  const dirname = path.dirname(file);
  if (!await fsExists(dirname)) {
    await fs.mkdir(dirname, { recursive: true });
  }
  await fs.writeFile(file, data, 'utf-8');
}

async function fsCopyFile(source: string, destination: string) {
  if (await fsExists(source)) {
    const dirname = path.dirname(destination);
    if (!await fsExists(dirname)) {
      await fs.mkdir(dirname, { recursive: true });
    }
    await fs.copyFile(source, destination);
  }
};

async function fsCopyFolder(source: string, destination: string) {
  //find all the files from source
  const files = await fs.readdir(source);
  for (const file of files) {
    //ignore . and ..
    if (file === '.' || file === '..') continue;
    //make an absolute source path
    const absolute = path.join(source, file);
    const stat = await fs.stat(absolute);
    //if file is a directory, recurse
    if (stat.isDirectory()) {
      fsCopyFolder(
        path.join(source, file),
        path.join(destination, file)
      );
      continue;
    }
    await fsCopyFile(absolute, path.join(destination, file));
  }
};

async function fsExists(path: string) {
  return await fs.access(path).then(() => true).catch(() => false);
};

build().then(() => {
  console.log('Build completed successfully.');
  process.exit(0);
}).catch((error) => {
  console.error('Build failed:', error);
  process.exit(1);
});