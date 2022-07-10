<template>
  <PageLayout :sidebar-menu-list="sidebarMenuList">
    <router-view />
  </PageLayout>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import { useI18n } from "@tager/admin-services";
import { HomeIcon } from "@tager/admin-ui";
import { MenuItemType, PageLayout } from "@tager/admin-layout";

import { getLinks } from "@/constants/links";

export default defineComponent({
  name: "BaseApp",
  components: { PageLayout },
  setup() {
    const i18n = useI18n();

    const links = computed(() => getLinks(i18n));

    const sidebarMenuList: Array<MenuItemType> = [
      { id: "home", icon: HomeIcon, ...links.value.HOME },
      // { id: "pages", icon: ViewListIcon, ...links.value.PAGE_LIST },
      // {
      //   id: "settings",
      //   icon: SettingsIcon,
      //   text: i18n.t("admin:settings"),
      //   children: [
      //     links.value.SETTINGS_COMMON,
      //     links.value.SEO_TEMPLATES,
      //     links.value.SEO_SETTINGS,
      //   ],
      // },
      // {
      //   id: "email",
      //   text: i18n.t("admin:eMail"),
      //   icon: ViewListIcon,
      //   children: [links.value.EMAIL_TEMPLATE_LIST, links.value.EMAIL_LOG_LIST],
      // },
      // {
      //   id: "admins",
      //   text: i18n.t("admin:administrators"),
      //   icon: SettingsIcon,
      //   children: [links.value.ADMIN_ADMINS, links.value.ADMIN_ROLES],
      // },
    ];

    return {
      sidebarMenuList,
    };
  },
});
</script>

<style scoped lang="scss"></style>
