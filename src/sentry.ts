import * as Sentry from "@sentry/vue";
import type { App } from "vue";

import { environment } from "@tager/admin-services";

export function initSentry(app: App) {
  if (environment.sentryDsn) {
    Sentry.init({
      app,
      attachProps: true,
      enabled:
        environment.nodeEnv === "production" && environment.appEnv !== "local",
      dsn: environment.sentryDsn,
      environment: [environment.sentryEnv, environment.appEnv].join("_"),
    });
  }
}
