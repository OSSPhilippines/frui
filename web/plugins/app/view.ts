//node
import path from 'path';
//modules
import type { 
  HttpServer, 
  HttpRequest, 
  HttpResponse,
  ResponseStatus
} from '@stackpress/ingest';
import Status from '@stackpress/lib/Status';
import reactus, { Server } from 'reactus';

export function config(server: HttpServer) {
  //get current working directory
  const cwd = server.config.path('cwd', process.cwd());
  //create reactus engine
  const engine = reactus(Server.configure({ 
    cwd, 
    production: false,
    cssFiles: [
      'react-toastify/dist/ReactToastify.css',
      path.join(cwd, '../frui/frui.css')
    ]
  }));
  //register the reactus engine
  server.register('reactus', engine);
  //set the render function
  server.view.render = (action, props) => engine.render(action, props);
  //set the view engine
  server.view.engine = async (action, req, res, ctx) => {
    //set the final status
    const status = Status.get(res.code || 200) as ResponseStatus;
    res.setStatus(status.code, status.status);
    //const render, if redirecting
    if (res.redirected 
      //or if json
      || req.data.has('json')
      //or body is a string already
      || typeof res.body === 'string'
    ) return;
    //get props from config
    const props = ctx.config.path('view.props', {});
    //render the html
    const html = await ctx.view.render(action, {
      data: {...props, ...res.data<Record<string, unknown>>() },
      request: {
        url: {
          hash: req.url.hash,
          host: req.url.host,
          hostname: req.url.hostname,
          href: req.url.href,
          origin: req.url.origin,
          pathname: req.url.pathname,
          port: req.url.port,
          protocol: req.url.protocol,
          search: req.url.search
        },
        headers: Object.fromEntries(req.headers.entries()),
        session: req.session.data,
        method: req.method,
        mime: req.mimetype,
        data: req.data()
      },
      response: res.toStatusResponse()
    });
    //if there is html
    if (html) {
      //add the html to the response
      res.setHTML(html, status.code, status.status);
    }
  };
};

export async function route(
  req: HttpRequest, 
  res: HttpResponse, 
  ctx: HttpServer
) {
  const reactus = ctx.plugin<any>('reactus');
  //handles public, assets and hmr
  await reactus.http(req.resource, res.resource);
  //if middleware was triggered
  //stop the response
  if (res.resource.headersSent) res.stop();
};