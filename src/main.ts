import Vue from 'vue';
import { configStore } from '@tager/admin-services';
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';
import { AdminUiPlugin } from '@tager/admin-ui';

import '@tager/admin-ui/dist/admin-ui.css';
import '@/assets/css/index.css';

import router from '@/router';
import config from '@/config/config.json';
import App from '@/views/App.vue';

configStore.setConfig(config);

if (process.env.VUE_APP_SENTRY_DSN) {
  Sentry.init({
    enabled: process.env.NODE_ENV === 'production',
    dsn: process.env.VUE_APP_SENTRY_DSN,
    environment:
      process.env.VUE_APP_SENTRY_ENVIRONMENT ||
      process.env.VUE_APP_ENV ||
      'default',
    integrations: [new VueIntegration({ Vue, attachProps: true })],
  });
}

Vue.use(AdminUiPlugin);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
