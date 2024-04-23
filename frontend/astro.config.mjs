import { defineConfig } from 'astro/config';
import apostrophe from '@apostrophecms/apostrophe-astro';

// For production. You can use other adapters that support
// `output: 'server'`
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [
    apostrophe({
      aposHost: 'http://localhost:3000',
      widgetsMapping: './src/widgets',
      templatesMapping: './src/templates',
      viewTransitionWorkaround: false,
      forwardHeaders: [
        'content-security-policy', 
        'strict-transport-security', 
        'x-frame-options',
        'referrer-policy',
        'cache-control',
        'host'
      ],
      proxyRoutes: [
        // Custom URLs that should be proxied to Apostrophe.
        // Note that all of `/api/v1` is already proxied, so
        // this is usually unnecessary
      ]
    })
  ],
  vite: {
    ssr: {
      // Do not externalize the @apostrophecms/apostrophe-astro plugin, we need
      // to be able to use virtual: URLs there
      noExternal: [ '@apostrophecms/apostrophe-astro' ],
    }
  }
});
