//modules
import type { HttpServer } from '@stackpress/ingest';
//src
import type { Config } from '../app/types.js';

export default function plugin(server: HttpServer<Config>) {
  server.on('route', async (_, __, ctx) => {
    ctx.get('/start', '@/plugins/docs/views/start');

    ctx.get('/component', '@/plugins/docs/views/component/index');
    ctx.get('/component/accordion', '@/plugins/docs/views/component/accordion');
    ctx.get('/component/alert', '@/plugins/docs/views/component/alert');
    ctx.get('/component/badge', '@/plugins/docs/views/component/badge');
    ctx.get('/component/bread', '@/plugins/docs/views/component/bread');
    ctx.get('/component/button', '@/plugins/docs/views/component/button');
    ctx.get('/component/dialog', '@/plugins/docs/views/component/dialog');
    ctx.get('/component/loader', '@/plugins/docs/views/component/loader');
    ctx.get('/component/notifier', '@/plugins/docs/views/component/notifier');
    ctx.get('/component/progress', '@/plugins/docs/views/component/progress');
    ctx.get('/component/pager', '@/plugins/docs/views/component/pager');
    ctx.get('/component/table', '@/plugins/docs/views/component/table');
    ctx.get('/component/tabs', '@/plugins/docs/views/component/tabs');
    ctx.get('/component/tooltip', '@/plugins/docs/views/component/tooltip');

    ctx.get('/form', '@/plugins/docs/views/form/index');
    ctx.get('/form/checkbox', '@/plugins/docs/views/form/checkbox');
    ctx.get('/form/code-editor', '@/plugins/docs/views/form/code-editor');
    ctx.get('/form/color-input', '@/plugins/docs/views/form/color-input');
    ctx.get('/form/country-select', '@/plugins/docs/views/form/country-select');
    ctx.get('/form/currency-select', '@/plugins/docs/views/form/currency-select');
    ctx.get('/form/date-input', '@/plugins/docs/views/form/date-input');
    ctx.get('/form/datetime-input', '@/plugins/docs/views/form/datetime-input');
    ctx.get('/form/file-input', '@/plugins/docs/views/form/file-input');
    ctx.get('/form/file-list', '@/plugins/docs/views/form/file-list');
    ctx.get('/form/image-input', '@/plugins/docs/views/form/image-input');
    ctx.get('/form/image-list', '@/plugins/docs/views/form/image-list');
    ctx.get('/form/input', '@/plugins/docs/views/form/input');
    ctx.get('/form/markdown-editor', '@/plugins/docs/views/form/markdown-editor');
    ctx.get('/form/mask-input', '@/plugins/docs/views/form/mask-input');
    ctx.get('/form/metadata', '@/plugins/docs/views/form/metadata');
    ctx.get('/form/number-input', '@/plugins/docs/views/form/number-input');
    ctx.get('/form/password-input', '@/plugins/docs/views/form/password-input');
    ctx.get('/form/radio', '@/plugins/docs/views/form/radio');
    ctx.get('/form/rating', '@/plugins/docs/views/form/rating');
    ctx.get('/form/select', '@/plugins/docs/views/form/select');
    ctx.get('/form/slider', '@/plugins/docs/views/form/slider');
    ctx.get('/form/slug-input', '@/plugins/docs/views/form/slug-input');
    ctx.get('/form/suggest-input', '@/plugins/docs/views/form/suggest-input');
    ctx.get('/form/switch', '@/plugins/docs/views/form/switch');
    ctx.get('/form/tag-list', '@/plugins/docs/views/form/tag-list');
    ctx.get('/form/text-list', '@/plugins/docs/views/form/text-list');
    ctx.get('/form/text-editor', '@/plugins/docs/views/form/text-editor');
    ctx.get('/form/textarea', '@/plugins/docs/views/form/textarea');
    ctx.get('/form/time-input', '@/plugins/docs/views/form/time-input');

    ctx.get('/view', '@/plugins/docs/views/view/index');
    ctx.get('/view/boolean-format', '@/plugins/docs/views/view/boolean-format');    
    ctx.get('/view/code-highlighter', '@/plugins/docs/views/view/code-highlighter');
    ctx.get('/view/color-format', '@/plugins/docs/views/view/color-format');
    ctx.get('/view/country-format', '@/plugins/docs/views/view/country-format');
    ctx.get('/view/currency-format', '@/plugins/docs/views/view/currency-format');
    ctx.get('/view/date-format', '@/plugins/docs/views/view/date-format');
    ctx.get('/view/email-link', '@/plugins/docs/views/view/email-link');
    ctx.get('/view/formula', '@/plugins/docs/views/view/formula');
    ctx.get('/view/html', '@/plugins/docs/views/view/html');
    ctx.get('/view/image-format', '@/plugins/docs/views/view/image-format');
    ctx.get('/view/image-carousel', '@/plugins/docs/views/view/image-carousel');
    ctx.get('/view/link-format', '@/plugins/docs/views/view/link-format');
    ctx.get('/view/list', '@/plugins/docs/views/view/list');
    ctx.get('/view/markdown', '@/plugins/docs/views/view/markdown');
    ctx.get('/view/metadata-format', '@/plugins/docs/views/view/metadata-format');
    ctx.get('/view/number-format', '@/plugins/docs/views/view/number-format');
    ctx.get('/view/overflow', '@/plugins/docs/views/view/overflow');
    ctx.get('/view/phone-link', '@/plugins/docs/views/view/phone-link');
    ctx.get('/view/rating-format', '@/plugins/docs/views/view/rating-format');
    ctx.get('/view/separate', '@/plugins/docs/views/view/separate');
    ctx.get('/view/table-format', '@/plugins/docs/views/view/table-format');
    ctx.get('/view/taglist-format', '@/plugins/docs/views/view/taglist-format');
    ctx.get('/view/text', '@/plugins/docs/views/view/text');

    ctx.get('/tool/box', '@/plugins/docs/views/tool/box');
    ctx.get('/tool/card', '@/plugins/docs/views/tool/card');
    ctx.get('/tool/scope', '@/plugins/docs/views/tool/scope');
    ctx.get('/tool/when', '@/plugins/docs/views/tool/when');
  });
}