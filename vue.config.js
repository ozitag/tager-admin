const util = require('util');
const SentryCliPlugin = require('@sentry/webpack-plugin');

const appConfig = require('./src/config/config.json');

const isSentryEnabled = [
  process.env.SENTRY_AUTH_TOKEN,
  process.env.SENTRY_ORG,
  process.env.SENTRY_PROJECT,
  process.env.NODE_ENV === 'production',
  process.env.VUE_APP_ENV !== 'local'
].every(Boolean);

console.log(
  util.inspect(`Sentry CLI Plugin enabled: ${isSentryEnabled}`, {
    colors: true
  })
);

module.exports = {
  pages: {
    index: {
      entry: 'src/main.ts',
      title: appConfig.TITLE_TEMPLATE.replace(/{{title}}/, 'Home')
    }
  },
  publicPath: process.env.VUE_APP_PUBLIC_PATH || '/',
  chainWebpack: config => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({ svgo: { plugins: [{ removeViewBox: false }] } });
  },
  configureWebpack: {
    plugins: [
      isSentryEnabled
        ? new SentryCliPlugin({
          include: 'dist',
          release: '1.0.0'
        })
        : null
    ].filter(Boolean)
  }
};
