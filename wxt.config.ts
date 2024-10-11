import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'LinkedIn AI Reply Ext',
    description: 'Enhances LinkedIn messaging experience powered by AI',
    version: '1.0',
    permissions: ['activeTab', 'storage', 'tabs','background'],
    action: {
    "default_popup": "popup/index.html"
    },
    background: {
      service_worker: 'background.ts'
    },
    content_scripts:[{
      matches: ['*://www.linkedin.com/*'],
      "js": ["content-scripts/content.js"],
      "run_at" : "document_idle"
    }],
    content_security_policy: {
      "extension_pages": "script-src 'self'; object-src 'self';"
    },
  },
});
