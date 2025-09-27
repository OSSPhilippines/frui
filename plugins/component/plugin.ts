import type { HttpServer } from '@stackpress/ingest';

export default function plugin(server: HttpServer) {
  server.on('route', (_, __, ctx) => {
    ctx.get('/component', '@/plugins/component/views/index');
    ctx.get('/component/accordion', '@/plugins/component/views/accordion');
    ctx.get('/component/alert', '@/plugins/component/views/alert');
    ctx.get('/component/badge', '@/plugins/component/views/badge');
    ctx.get('/component/bread', '@/plugins/component/views/bread');
    ctx.get('/component/button', '@/plugins/component/views/button');
    ctx.get('/component/dialog', '@/plugins/component/views/dialog');
    ctx.get('/component/loader', '@/plugins/component/views/loader');
    ctx.get('/component/notifier', '@/plugins/component/views/notifier');
    ctx.get('/component/progress', '@/plugins/component/views/progress');
    ctx.get('/component/pager', '@/plugins/component/views/pager');
    ctx.get('/component/table', '@/plugins/component/views/table');
    ctx.get('/component/tabs', '@/plugins/component/views/tabs');
    ctx.get('/component/tooltip', '@/plugins/component/views/tooltip');
  });
}