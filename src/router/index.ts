import Vue, { CreateElement, VNode } from 'vue';
import VueRouter from 'vue-router';

import NotFound from '@/views/NotFound/index.vue';
import { CustomRoute, CustomRouteConfig } from '@/typings/common';
import config from '@/config/config.json';

Vue.use(VueRouter);

const HomePage = Vue.extend({
  render(createElement: CreateElement): VNode {
    return createElement('div', {}, 'Home page');
  }
});

const routes: Array<CustomRouteConfig> = [
  {
    path: '/',
    component: HomePage,
    name: 'Home',
    meta: {
      getBreadcrumbs: (route: CustomRoute) => [{ path: '/', label: route.name }]
    }
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.afterEach(routeTo => {
  const pageName = routeTo.name ?? 'Not Found';

  document.title = config.TITLE_TEMPLATE.replace(/{{title}}/, pageName);
});

export default router;
