import { createRequire } from "node:module";
import { fileURLToPath, URL } from "node:url";

import { sentryVitePlugin } from "@sentry/vite-plugin";
import vue from "@vitejs/plugin-vue";
import { defineConfig, loadEnv, type Plugin } from "vite";

import appConfig from "./src/config/config.json";

const require = createRequire(import.meta.url);

/** app.json кладётся в docker-сборке, в репозитории его нет. */
function readAppVersion(): string {
  try {
    return require("./src/config/app.json").version ?? "";
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "MODULE_NOT_FOUND") {
      console.log("app.json is not found!");
      return "";
    }
    throw error;
  }
}

/** Подставляет в index.html то, что раньше давал html-webpack-plugin. */
function htmlVars(vars: Record<string, string>): Plugin {
  return {
    name: "tager-html-vars",
    transformIndexHtml: {
      order: "pre",
      handler: (html) =>
        Object.entries(vars).reduce(
          (acc, [key, value]) => acc.replaceAll(`%${key}%`, value),
          html
        ),
    },
  };
}

/**
 * Переменные, которые раньше подставлял webpack.DefinePlugin. Их читает не
 * только код приложения, но и пакеты @tager/* (например admin-blog и
 * admin-pages обращаются к process.env.VUE_APP_WEBSITE_URL), поэтому
 * подстановка должна работать и внутри node_modules.
 */
const APP_VARS = [
  "VUE_APP_PUBLIC_PATH",
  "VUE_APP_ENV",
  "VUE_APP_API_URL",
  "VUE_APP_ACCESS_TOKEN",
  "VUE_APP_WEBSITE_URL",
  "VUE_APP_WEBSITE_BUTTON_URL",
  "VUE_APP_SENTRY_DSN",
  "VUE_APP_SENTRY_ENVIRONMENT",
];

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ["VUE_APP_", "NODE_ENV", "BASE_URL"]);
  // %BASE_URL% подставляется в index.html как есть, поэтому слеш на конце
  // обязателен: иначе получается /adminfavicon.ico вместо /admin/favicon.ico
  const base = (env.VUE_APP_PUBLIC_PATH || "/").replace(/\/*$/, "/");
  const nodeEnv =
    env.NODE_ENV || (mode === "production" ? "production" : "development");

  const define: Record<string, string> = {
    "process.env.NODE_ENV": JSON.stringify(nodeEnv),
    "process.env.BASE_URL": JSON.stringify(base),
    "process.env.VUE_APP_VERSION": JSON.stringify(readAppVersion()),
  };
  for (const key of APP_VARS) {
    define[`process.env.${key}`] = JSON.stringify(env[key] ?? "");
  }

  const isSentryEnabled = [
    env.VUE_APP_SENTRY_DSN,
    env.VUE_APP_SENTRY_ENVIRONMENT,
    process.env.SENTRY_AUTH_TOKEN,
    process.env.SENTRY_ORG,
    process.env.SENTRY_PROJECT,
    nodeEnv === "production",
    env.VUE_APP_ENV !== "local",
  ].every(Boolean);
  console.log(`Sentry plugin enabled: ${isSentryEnabled}`);

  return {
    base,
    define,
    plugins: [
      vue(),
      htmlVars({
        APP_TITLE: appConfig.TITLE_TEMPLATE.replace(/{{title}}/, "Home"),
        NODE_ENV: nodeEnv,
      }),
      ...(isSentryEnabled
        ? [
            sentryVitePlugin({
              org: process.env.SENTRY_ORG,
              project: process.env.SENTRY_PROJECT,
              authToken: process.env.SENTRY_AUTH_TOKEN,
            }),
          ]
        : []),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      sourcemap: isSentryEnabled,
    },
  };
});
