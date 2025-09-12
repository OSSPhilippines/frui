import type { 
  IM, SR,
  Method, 
  NestedObject, 
  ResponseStatus,
  UnknownNest, 
  StatusResponse,
  Trace, 
  FileMeta
} from '@stackpress/ingest';

import type { 
  OutputChunk, 
  OutputAsset, 
  RollupOutput 
} from 'rollup';
import type { 
  PluginOption, 
  InlineConfig, 
  ViteDevServer, 
  Connect as ViteConnect 
} from 'vite';
import type { 
  DocumentImport, 
  DocumentIterator,
  ServerManifest,
  BuildResults,
  Builder as ReactusBuilder, 
  ServerConfig as ReactusConfig 
} from 'reactus';

export type PageProps<R = unknown, S = unknown> = {
  data: {},
  session: unknown,
  request: {
    url: {
      hash: string,
      host: string,
      hostname: string,
      href: string,
      origin: string,
      pathname: string,
      port: string,
      protocol: string,
      search: string
    },
    headers: Record<string, string | string[]>,
    session: Record<string, string | string[]>,
    method: Method,
    mime: string,
    data: R
  },
  response: Partial<Partial<ResponseStatus & {
    error: string,
    errors?: NestedObject<string | string[]>,
    start?: number,
    end?: number,
    stack?: Trace[],
    results?: S,
    total?: number
  }>>,
  styles?: string[],
};

export type Config = {
  cwd: string,
  env: 'development' | 'production',
  view: Partial<ReactusConfig>
};

//ie. ctx.plugin<ViewPlugin>('view')
export type ViewPlugin = {
  config: ReactusConfig,
  paths: {
    asset: string,
    client: string,
    css?: string,
    head?: string,
    page: string
  };
  production: boolean,
  routes: { client: string, css: string },
  templates: {
    client: string,
    document: string,
    page: string
  };
  viteConfig: InlineConfig|null,
  size: number,
  builder: ReactusBuilder,
  build: (config: InlineConfig) => Promise<RollupOutput|RollupOutput[]>,
  dev: () => Promise<ViteDevServer>,
  http: (req: IM, res: SR) => Promise<unknown>,
  middlewares: () => Promise<ViteConnect.Server>,
  plugins: () => Promise<PluginOption[]>,
  fetch: <T = any>(url: string) => Promise<T>,
  import: <T = any>(pathname: string, extnames?: string[]) => Promise<T>,
  resolve: (pathname: string, extnames?: string[]) => Promise<FileMeta>,
  buildAllAssets: () => Promise<StatusResponse<BuildResults>[]>,
  buildAllClients: () => Promise<StatusResponse<BuildResults>[]>,
  buildAllPages: () => Promise<StatusResponse<BuildResults>[]>,
  entries: () => [ Document, number ][],
  find: (id: string) => Document | null,
  forEach: (callback: DocumentIterator<unknown>) => void,
  get: (entry: string) => Promise<Document | null>,
  has: (entry: string) => Promise<boolean>,
  load: (hash: Record<string, string>) => ServerManifest,
  open: (file: string) => Promise<ServerManifest>,
  map: <T = unknown>(callback: DocumentIterator<T>) => T[],
  save: (file: string) => Promise<ServerManifest>,
  set: (entry: string) => Promise<Document>,
  toJSON: () => { [k: string]: string },
  values: () => Document[],
  absolute: (entry: string) => Promise<string>,
  id: (entry: string) => Promise<string>,
  importPage: (entry: string) => Promise<DocumentImport>,
  relative: (entry: string, fromFile: string) => Promise<string>,
  buildAssets: (entry: string) => Promise<[ 
    OutputChunk, 
    ...(OutputAsset | OutputChunk)[]
  ]>,
  buildClient: (entry: string) => Promise<[ 
    OutputChunk, 
    ...(OutputAsset | OutputChunk)[]
  ]>,
  buildPage: (entry: string, assets?: BuildResults) => Promise<[ 
    OutputChunk, 
    ...(OutputAsset | OutputChunk)[]
  ]>,
  renderHMR: (entry: string) => Promise<string>,
  render: (entry: string, props?: UnknownNest) => Promise<string>
};