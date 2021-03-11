<template>
  <page-layout :sidebar-menu-list="sidebarMenuList">
    <router-view />
  </page-layout>
</template>

<script lang="ts">
import { computed, defineComponent, SetupContext } from '@vue/composition-api';

import { useTranslation } from '@tager/admin-ui';
import { MenuItemType } from '@tager/admin-layout';
import { getLinks } from '@/constants/links';

export default defineComponent({
  name: 'App',
  setup(props, context: SetupContext) {
    const { t } = useTranslation(context);

    const links = computed(() => getLinks(t));

    const sidebarMenuList: Array<MenuItemType> = [
      { id: 'home', icon: 'home', ...links.value.HOME },
      { id: 'pages', icon: 'viewList', ...links.value.PAGE_LIST },
      {
        id: 'settings',
        icon: 'settings',
        text: t('admin:settings'),
        children: [
          links.value.SETTINGS_COMMON,
          links.value.SEO_TEMPLATES,
          links.value.SEO_SETTINGS,
        ],
      },
      {
        id: 'email',
        text: t('admin:eMail'),
        icon: 'viewList',
        children: [links.value.EMAIL_TEMPLATE_LIST, links.value.EMAIL_LOG_LIST],
      },
      {
        id: 'admins',
        text: t('admin:administrators'),
        icon: 'settings',
        children: [links.value.ADMIN_ADMINS, links.value.ADMIN_ROLES],
      },
    ];

    return {
      sidebarMenuList,
    };
  },
});
</script>

<style scoped lang="scss"></style>
