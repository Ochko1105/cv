import { D1Database } from '@cloudflare/workers-types';

declare global {
  interface CloudflareEnv {
    DB: D1Database;
  }
}

declare module '@cloudflare/next-on-pages' {
  import { RequestContext } from '@cloudflare/next-on-pages';
  export function getRequestContext(): {
    env: CloudflareEnv;
    cf: RequestContext['cf'];
    ctx: RequestContext['ctx'];
  };
}