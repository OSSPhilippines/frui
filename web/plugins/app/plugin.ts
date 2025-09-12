//modules
import type { HttpServer } from '@stackpress/ingest';
//src
import * as view from './view.js';

export default function plugin(server: HttpServer) {
  server.on('config', (_, __, ctx) => {
    view.config(ctx);
  });

  server.on('route', async (_, __, ctx) => {
    ctx.on('request', (req, res, ctx) => view.route(req, res, ctx));
  });
}