import type { HttpServer } from '@stackpress/ingest';

export default function plugin(server: HttpServer) {
  server.on('route', (_, __, ctx) => {
    ctx.get('/format', '@/plugins/format/views/index');
    ctx.get('/format/code', '@/plugins/format/views/code');
    ctx.get('/format/color', '@/plugins/format/views/color');
    ctx.get('/format/country', '@/plugins/format/views/country');
    ctx.get('/format/currency', '@/plugins/format/views/currency');
    ctx.get('/format/date', '@/plugins/format/views/date');
    ctx.get('/format/email', '@/plugins/format/views/email');
    ctx.get('/format/formula', '@/plugins/format/views/formula');
    ctx.get('/format/html', '@/plugins/format/views/html');
    ctx.get('/format/image', '@/plugins/format/views/image');
    ctx.get('/format/imagelist', '@/plugins/format/views/imagelist');
    ctx.get('/format/json', '@/plugins/format/views/json');
    ctx.get('/format/link', '@/plugins/format/views/link');
    ctx.get('/format/list', '@/plugins/format/views/list');
    ctx.get('/format/markdown', '@/plugins/format/views/markdown');
    ctx.get('/format/metadata', '@/plugins/format/views/metadata');
    ctx.get('/format/number', '@/plugins/format/views/number');
    ctx.get('/format/overflow', '@/plugins/format/views/overflow');
    ctx.get('/format/phone', '@/plugins/format/views/phone');
    ctx.get('/format/rating', '@/plugins/format/views/rating');
    ctx.get('/format/separated', '@/plugins/format/views/separated');
    ctx.get('/format/table', '@/plugins/format/views/table');
    ctx.get('/format/taglist', '@/plugins/format/views/taglist');
    ctx.get('/format/text', '@/plugins/format/views/text');
    ctx.get('/format/yesno', '@/plugins/format/views/yesno');
  });
}