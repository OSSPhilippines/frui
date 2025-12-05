//modules
import type { HttpServer } from '@stackpress/ingest';
//web
import type { Config } from '../app/types.js';

export default function plugin(server: HttpServer<Config>) {
  server.on('route', async (_, __, ctx) => {
    ctx.get('/start', '@/web/docs/views/start');

    ctx.get('/component', '@/web/docs/views/component/index');
    ctx.get('/component/accordion', '@/web/docs/views/component/accordion');
    ctx.get('/component/alert', '@/web/docs/views/component/alert');
    ctx.get('/component/badge', '@/web/docs/views/component/badge');
    ctx.get('/component/bread', '@/web/docs/views/component/bread');
    ctx.get('/component/button', '@/web/docs/views/component/button');
    ctx.get('/component/dialog', '@/web/docs/views/component/dialog');
    ctx.get('/component/loader', '@/web/docs/views/component/loader');
    ctx.get('/component/notifier', '@/web/docs/views/component/notifier');
    ctx.get('/component/progress', '@/web/docs/views/component/progress');
    ctx.get('/component/pager', '@/web/docs/views/component/pager');
    ctx.get('/component/table', '@/web/docs/views/component/table');
    ctx.get('/component/tabs', '@/web/docs/views/component/tabs');
    ctx.get('/component/tooltip', '@/web/docs/views/component/tooltip');

    ctx.get('/form', '@/web/docs/views/form/index');
    ctx.get('/form/checkbox', '@/web/docs/views/form/checkbox');
    ctx.get('/form/code-editor', '@/web/docs/views/form/code-editor');
    ctx.get('/form/color-input', '@/web/docs/views/form/color-input');
    ctx.get('/form/country-select', '@/web/docs/views/form/country-select');
    ctx.get('/form/currency-select', '@/web/docs/views/form/currency-select');
    ctx.get('/form/date-input', '@/web/docs/views/form/date-input');
    ctx.get('/form/datetime-input', '@/web/docs/views/form/datetime-input');
    ctx.get('/form/file-input', '@/web/docs/views/form/file-input');
    ctx.get('/form/file-list', '@/web/docs/views/form/file-list');
    ctx.get('/form/image-input', '@/web/docs/views/form/image-input');
    ctx.get('/form/image-list', '@/web/docs/views/form/image-list');
    ctx.get('/form/input', '@/web/docs/views/form/input');
    ctx.get('/form/markdown-editor', '@/web/docs/views/form/markdown-editor');
    ctx.get('/form/mask-input', '@/web/docs/views/form/mask-input');
    ctx.get('/form/metadata', '@/web/docs/views/form/metadata');
    ctx.get('/form/number-input', '@/web/docs/views/form/number-input');
    ctx.get('/form/password-input', '@/web/docs/views/form/password-input');
    ctx.get('/form/radio', '@/web/docs/views/form/radio');
    ctx.get('/form/rating', '@/web/docs/views/form/rating');
    ctx.get('/form/select', '@/web/docs/views/form/select');
    ctx.get('/form/slider', '@/web/docs/views/form/slider');
    ctx.get('/form/slug-input', '@/web/docs/views/form/slug-input');
    ctx.get('/form/suggest-input', '@/web/docs/views/form/suggest-input');
    ctx.get('/form/switch', '@/web/docs/views/form/switch');
    ctx.get('/form/tag-list', '@/web/docs/views/form/tag-list');
    ctx.get('/form/text-list', '@/web/docs/views/form/text-list');
    ctx.get('/form/text-editor', '@/web/docs/views/form/text-editor');
    ctx.get('/form/textarea', '@/web/docs/views/form/textarea');
    ctx.get('/form/time-input', '@/web/docs/views/form/time-input');

    ctx.get('/view', '@/web/docs/views/view/index');
    ctx.get('/view/carousel', '@/web/docs/views/view/carousel');
    ctx.get('/view/code', '@/web/docs/views/view/code');
    ctx.get('/view/color', '@/web/docs/views/view/color');
    ctx.get('/view/country', '@/web/docs/views/view/country');
    ctx.get('/view/currency', '@/web/docs/views/view/currency');
    ctx.get('/view/date-format', '@/web/docs/views/view/date-format');
    ctx.get('/view/email-link', '@/web/docs/views/view/email-link');
    ctx.get('/view/formula', '@/web/docs/views/view/formula');
    ctx.get('/view/html', '@/web/docs/views/view/html');
    ctx.get('/view/image', '@/web/docs/views/view/image');
    ctx.get('/view/link', '@/web/docs/views/view/link');
    ctx.get('/view/list', '@/web/docs/views/view/list');
    ctx.get('/view/markdown', '@/web/docs/views/view/markdown');
    ctx.get('/view/metadata', '@/web/docs/views/view/metadata');
    ctx.get('/view/number-format', '@/web/docs/views/view/number-format');
    ctx.get('/view/phone-link', '@/web/docs/views/view/phone-link');
    ctx.get('/view/rating', '@/web/docs/views/view/rating');
    ctx.get('/view/spread', '@/web/docs/views/view/spread');
    ctx.get('/view/tabular', '@/web/docs/views/view/tabular');
    ctx.get('/view/tags', '@/web/docs/views/view/tags');
    ctx.get('/view/text-transform', '@/web/docs/views/view/text-transform');
    ctx.get('/view/text-overflow', '@/web/docs/views/view/text-overflow');
    ctx.get('/view/yesno', '@/web/docs/views/view/yesno');

    ctx.get('/tool/box', '@/web/docs/views/tool/box');
    ctx.get('/tool/card', '@/web/docs/views/tool/card');
    ctx.get('/tool/scope', '@/web/docs/views/tool/scope');
    ctx.get('/tool/when', '@/web/docs/views/tool/when');
  });
}