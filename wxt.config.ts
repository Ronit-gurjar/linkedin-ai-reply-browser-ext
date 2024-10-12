import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'LinkedIn AI Reply',
    description: 'Enhances LinkedIn messaging experience powered by AI',
    version: '0.1.0',
    permissions: ['activeTab', 'storage', 'tabs'],
    host_permissions: ['*://www.linkedin.com/*'],
    action: {
      default_popup: 'popup/index.html'
    },
    background: {
      service_worker: 'background.ts'
    },
    content_scripts: [{
      matches: ['*://www.linkedin.com/*'],
      "js": ["content-scripts/content.js"],
      "run_at" : 'document_idle'
    }],
    content_security_policy: {
      extension_pages: "script-src 'self'; object-src 'self'; trusted-types default allow-duplicates;",
      sandbox: "sandbox allow-scripts allow-forms allow-popups allow-modals; script-src 'self' 'unsafe-inline' 'unsafe-eval'; child-src 'self'; trusted-types default allow-duplicates;"
    },
  },
});
