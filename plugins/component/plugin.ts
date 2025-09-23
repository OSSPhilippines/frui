import type { HttpServer } from '@stackpress/ingest';

export default function plugin(server: HttpServer) {
  server.on('route', (_, __, ctx) => {
    ctx.get('/component', '@/plugins/component/views/index');
    ctx.get('/component/accordion', '@/plugins/component/views/accordion');
    ctx.get('/component/alert', '@/plugins/component/views/alert');
    ctx.get('/component/badge', '@/plugins/component/views/badge');
    ctx.get('/component/button', '@/plugins/component/views/button');
    ctx.get('/component/crumbs', '@/plugins/component/views/crumbs');
    ctx.get('/component/loader', '@/plugins/component/views/loader');
    ctx.get('/component/modal', '@/plugins/component/views/modal');
    ctx.get('/component/progress', '@/plugins/component/views/progress');
    ctx.get('/component/pager', '@/plugins/component/views/pager');
    ctx.get('/component/table', '@/plugins/component/views/table');
    ctx.get('/component/tabs', '@/plugins/component/views/tabs');
    ctx.get('/component/tooltip', '@/plugins/component/views/tooltip');
  });
}