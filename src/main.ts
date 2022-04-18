import { createApp } from "vue";

import { configStore, i18n, i18nPlugin } from "@tager/admin-services";

import "@/styles";
import { router } from "@/router";
import config from "@/config/config.json";
import App from "@/views/App.vue";
import { applyTranslations } from "@/locales/apply";
import { populateEnvironment } from "@/env";
import { initSentry } from "@/sentry";

populateEnvironment();
applyTranslations();

configStore.setConfig(config);

const app = createApp(App);

initSentry(app);

app.use(router);
app.use(i18nPlugin);

i18n.init({ debug: false }).then(() => {
  app.mount("#app");
});
