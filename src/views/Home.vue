<template>
  <navigation-grid :nav-items="navItemList" />
</template>

<script lang="ts">
import Vue from 'vue';
import { NavigationGridItem } from '@tager/admin-ui';

export default Vue.extend({
  name: 'Home',
  computed: {
    navItemList(): Array<NavigationGridItem> {
      return [];
    },
  },
});
</script>

<style scoped></style>
