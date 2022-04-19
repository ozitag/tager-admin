const util = require("util");

const { defineConfig } = require("@vue/cli-service");
const SentryCliPlugin = require("@sentry/webpack-plugin");

const appConfig = require("./src/config/config.json");

function colorLog(message) {
  console.log(
    util.inspect(message, {
      colors: true,
    })
  );
}

function setAppVersion() {
  try {
    /** `app.json` probably can be added in docker */
    const app = require("./src/config/app.json");
    process.env.VUE_APP_VERSION = app.version;
  } catch (error) {
    if (error.code === "MODULE_NOT_FOUND") {
      colorLog("app.json is not found!");
    } else {
      throw error;
    }
  }
}

const isSentryEnabled = [
  process.env.VUE_APP_SENTRY_DSN,
  process.env.VUE_APP_SENTRY_ENVIRONMENT,
  process.env.SENTRY_AUTH_TOKEN,
  process.env.SENTRY_ORG,
  process.env.SENTRY_PROJECT,
  process.env.NODE_ENV === "production",
  process.env.VUE_APP_ENV !== "local",
].every(Boolean);

colorLog(`Sentry CLI Plugin enabled: ${isSentryEnabled}`);

setAppVersion();

module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: "src/main.ts",
      title: appConfig.TITLE_TEMPLATE.replace(/{{title}}/, "Home"),
    },
  },
  publicPath: process.env.VUE_APP_PUBLIC_PATH || "/",
  chainWebpack: (config) => {
    if (isSentryEnabled) {
      config.plugin("sentry").use(SentryCliPlugin, [
        {
          include: "dist",
          release: "1.0.0",
        },
      ]);
    }
  },
});
