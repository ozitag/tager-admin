import { createRouter, CustomRouteConfig } from '@tager/admin-layout';

import Home from '@/views/Home.vue';

export const HOME_ROUTE: CustomRouteConfig = {
  path: '/',
  component: Home,
  name: 'Home',
  meta: {
    getBreadcrumbs: () => [{ url: '/', text: 'Home' }],
  },
};

const router = createRouter({
  routes: [HOME_ROUTE],
});

export default router;
