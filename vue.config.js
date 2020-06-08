const config = require('./src/config/config.json');

module.exports = {
  pages: {
    index: {
      entry: 'src/main.ts',
      title: config.TITLE_TEMPLATE.replace(/{{title}}/, 'Home')
    }
  },
  publicPath: '/admin',
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
  }
};
