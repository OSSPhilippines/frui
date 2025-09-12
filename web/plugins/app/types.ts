import type { 
  Method, 
  NestedObject, 
  Trace, 
  ResponseStatus 
} from '@stackpress/ingest';

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