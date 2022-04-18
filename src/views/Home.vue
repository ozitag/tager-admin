<template>
  <NavigationGrid :nav-items="navItemList" />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, SetupContext } from "vue";

import { NavigationGrid, type NavigationGridItem } from "@tager/admin-ui";
import { ResponseBody, useI18n, useResource } from "@tager/admin-services";
// import { getPageCount } from "@tager/admin-pages";

import { getLinks } from "@/constants/links";

export default defineComponent({
  name: "PageHome",
  components: { NavigationGrid },
  setup(props, context: SetupContext) {
    const i18n = useI18n();

    const [
      fetchPageCount,
      { data: pageCountData, status: pageCountDataStatus },
    ] = useResource({
      // fetchResource: getPageCount,
      fetchResource: () => Promise.resolve({} as ResponseBody),
      initialValue: null,
      resourceName: "Page count",
    });

    onMounted(() => {
      fetchPageCount();
    });

    const links = computed(() => getLinks(i18n));

    const navItemList = computed<Array<NavigationGridItem>>(() => {
      return [
        // {
        //   name: links.value.PAGE_LIST.text,
        //   url: links.value.PAGE_LIST.url,
        //   total: {
        //     value: pageCountData.value?.count ?? 0,
        //     status: pageCountDataStatus.value,
        //   },
        // },
        // {
        //   name: i18n.t("admin:settings"),
        //   linkList: [
        //     links.value.SETTINGS_COMMON,
        //     links.value.SEO_TEMPLATES,
        //     links.value.SEO_SETTINGS,
        //   ],
        // },
        // {
        //   name: i18n.t("admin:eMail"),
        //   linkList: [
        //     links.value.EMAIL_TEMPLATE_LIST,
        //     links.value.EMAIL_LOG_LIST,
        //   ],
        // },
        // {
        //   name: i18n.t("admin:administrators"),
        //   linkList: [links.value.ADMIN_ADMINS, links.value.ADMIN_ROLES],
        // },
      ];
    });

    return {
      navItemList,
    };
  },
});
</script>

<style scoped></style>
