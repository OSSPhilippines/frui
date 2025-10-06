import type { HttpServer } from '@stackpress/ingest';

export default function plugin(server: HttpServer) {
  server.on('route', (_, __, ctx) => {
    ctx.get('/tool', '@/plugins/tool/views/index');
    ctx.get('/tool/when', '@/plugins/tool/views/when');
  });
}