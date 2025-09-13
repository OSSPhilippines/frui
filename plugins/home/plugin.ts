'use client';
import type { HttpServer } from '@stackpress/ingest';

export default function plugin(server: HttpServer) {
  server.on('route', (_, __, ctx) => {
    ctx.get('/', '@/plugins/home/views/home');
    ctx.get('/start', '@/plugins/home/views/start');
  });
}