import { createRouter, CustomRouteConfig } from '@tager/admin-layout';
import { PAGE_FORM_ROUTE, PAGE_LIST_ROUTE } from '@tager/admin-pages';
import {
  EMAIL_LOG_LIST_ROUTE,
  EMAIL_TEMPLATE_FORM_ROUTE,
  EMAIL_TEMPLATE_LIST_ROUTE,
} from '@tager/admin-mail';
import { SEO_SETTINGS_ROUTE, SEO_TEMPLATES_ROUTE } from '@tager/admin-seo';
import {
  SETTINGS_ITEM_FORM_ROUTE,
  SETTINGS_ITEM_LIST_ROUTE,
} from '@tager/admin-settings';
import {
  ADMIN_FORM_ROUTE,
  ADMIN_LIST_ROUTE,
  ROLE_FORM_ROUTE,
  ROLE_LIST_ROUTE,
} from '@tager/admin-administrators';

import Home from '@/views/Home.vue';

export const HOME_ROUTE: CustomRouteConfig = {
  path: '/',
  component: Home,
  name: 'Home',
  meta: {
    getBreadcrumbs: (route, t) => [{ url: '/', text: t('admin:home') }],
  },
};

const router = createRouter({
  routes: [
    HOME_ROUTE,
    PAGE_FORM_ROUTE,
    PAGE_LIST_ROUTE,
    EMAIL_LOG_LIST_ROUTE,
    EMAIL_TEMPLATE_FORM_ROUTE,
    EMAIL_TEMPLATE_LIST_ROUTE,
    SETTINGS_ITEM_FORM_ROUTE,
    SETTINGS_ITEM_LIST_ROUTE,
    SEO_SETTINGS_ROUTE,
    SEO_TEMPLATES_ROUTE,
    ADMIN_FORM_ROUTE,
    ADMIN_LIST_ROUTE,
    ROLE_FORM_ROUTE,
    ROLE_LIST_ROUTE,
  ],
});

export default router;
