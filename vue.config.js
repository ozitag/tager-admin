const SentryCliPlugin = require('@sentry/webpack-plugin');

const appConfig = require('./src/config/config.json');

const isProduction = process.env.NODE_ENV === 'production';

const isSentryEnabled = [
  process.env.SENTRY_AUTH_TOKEN,
  process.env.SENTRY_ORG,
  process.env.SENTRY_PROJECT
].every(Boolean);

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
      isProduction && isSentryEnabled
        ? new SentryCliPlugin({
            include: 'dist'
          })
        : null
    ].filter(Boolean)
  }
};
