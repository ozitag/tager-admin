import Vue, { CreateElement, VNode } from 'vue';
import { createRouter, CustomRouteConfig } from '@tager/admin-layout';

const HomePage = Vue.extend({
  render(createElement: CreateElement): VNode {
    return createElement('div', {}, 'Home page');
  },
});

export const HOME_ROUTE: CustomRouteConfig = {
  path: '/',
  component: HomePage,
  name: 'Home',
  meta: {
    getBreadcrumbs: (route) => [{ path: '/', label: route.name }],
  },
};

const router = createRouter({
  routes: [HOME_ROUTE],
});

export default router;
