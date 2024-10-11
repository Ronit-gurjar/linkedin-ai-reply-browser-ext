import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'LinkedIn AI Reply Ext',
    description: 'Enhances LinkedIn messaging experience powered by AI',
    version: '1.0',
    permissions: ['activeTab'],
  },
});
