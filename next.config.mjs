// next.config.mjs
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // бусад тохиргоо...
};

export default (async () => {
  if (process.env.NODE_ENV === 'development') {
    await setupDevPlatform();
  }
  return nextConfig;
})();
