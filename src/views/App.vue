<template>
  <page-layout :sidebar-menu-list="sidebarMenuList">
    <router-view />
  </page-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { MENU_ITEM_LIST } from '@/config/sidebarMenu';

export default Vue.extend({
  name: 'App',
  data() {
    return {
      sidebarMenuList: MENU_ITEM_LIST,
    };
  },
});
</script>

<style scoped lang="scss"></style>
