//node
import fs from 'node:fs';
import path from 'node:path';
//modules
import type { HttpServer } from '@stackpress/ingest';
//src
import type { Config } from './types.js';
import * as view from './view.js';

const mime: Record<string, string> = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

export default function plugin(server: HttpServer<Config>) {
  server.on('config', (_, __, ctx) => {
    view.config(ctx);
  });

  server.on('route', async (_, __, ctx) => {
    ctx.on('request', async (req, res, ctx) => {
      await view.route(req, res, ctx);
      //if there is a body or a code that is not 404, skip
      if (res.resource.headersSent 
        || res.body 
        || (res.code && res.code !== 404)
      ) return;
      //get the resource pathname
      const resource = req.url.pathname.substring(1).replace(/\/\//, '/'); 
      //if no pathname, skip
      if (resource.length === 0) return;
      const assets = server.config.get<string>('assets');
      const file = path.resolve(assets, resource);
      if (fs.existsSync(file)) {
        const ext = path.extname(file);
        const type = mime[ext] || 'application/octet-stream';
        res.setBody(type, fs.createReadStream(file));
      }
    });
  });
}