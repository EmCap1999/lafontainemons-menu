
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {},
  assets: {
    'index.csr.html': {size: 666, hash: '7ce11be0fc27f08615aa280652ba65cdf7304936b1abd567669672ea397be49e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1012, hash: '625f3c91aefd5960ef9865b27b6cdaa877ae00cee2e968b2314ba8d2dd79ae06', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-OVGGZTOV.css': {size: 42, hash: 'bux1nJu3TIo', text: () => import('./assets-chunks/styles-OVGGZTOV_css.mjs').then(m => m.default)}
  },
};
