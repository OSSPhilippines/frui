import type { HttpServer } from '@stackpress/ingest';

export default function plugin(server: HttpServer) {
  server.on('route', (_, __, ctx) => {
    ctx.get('/field/autocomplete', '@/plugins/field/views/autocomplete');
    ctx.get('/field/checkbox', '@/plugins/field/views/checkbox');
    ctx.get('/field/checklist', '@/plugins/field/views/checklist');
    ctx.get('/field/color', '@/plugins/field/views/color');
    ctx.get('/field/country', '@/plugins/field/views/country');
    ctx.get('/field/currency', '@/plugins/field/views/currency');
    ctx.get('/field/date', '@/plugins/field/views/date');
    ctx.get('/field/datetime', '@/plugins/field/views/datetime');
    ctx.get('/field/editor', '@/plugins/field/views/editor');
    ctx.get('/field/file', '@/plugins/field/views/file');
    ctx.get('/field/filelist', '@/plugins/field/views/filelist');
    ctx.get('/field/image', '@/plugins/field/views/image');
    ctx.get('/field/imagelist', '@/plugins/field/views/imagelist');
    ctx.get('/field/input', '@/plugins/field/views/input');
    ctx.get('/field/knob', '@/plugins/field/views/knob');
    ctx.get('/field/markdown', '@/plugins/field/views/markdown');
    ctx.get('/field/mask', '@/plugins/field/views/mask');
    ctx.get('/field/metadata', '@/plugins/field/views/metadata');
    ctx.get('/field/number', '@/plugins/field/views/number');
    ctx.get('/field/password', '@/plugins/field/views/password');
    ctx.get('/field/radio', '@/plugins/field/views/radio');
    ctx.get('/field/rating', '@/plugins/field/views/rating');
    ctx.get('/field/select', '@/plugins/field/views/select');
    ctx.get('/field/slug', '@/plugins/field/views/slug');
    ctx.get('/field/switch', '@/plugins/field/views/switch');
    ctx.get('/field/taglist', '@/plugins/field/views/taglist');
    ctx.get('/field/textarea', '@/plugins/field/views/textarea');
    ctx.get('/field/textlist', '@/plugins/field/views/textlist');
    ctx.get('/field/time', '@/plugins/field/views/time');
    ctx.get('/field/wysiwyg', '@/plugins/field/views/wysiwyg');
  });
}