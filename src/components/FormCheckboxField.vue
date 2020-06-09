<template>
  <base-form-group>
    <base-checkbox
      :id="name"
      :name="name"
      :value="value"
      :checked="checked"
      @change="$emit('change', $event)"
    />
    <base-label v-if="Boolean(label)" for-checkbox :for="name">
      {{ label }}
    </base-label>
  </base-form-group>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    label: String,
    checked: Boolean,
    value: Boolean,
    error: String,
  },
});
</script>

<style scoped lang="scss">
label {
  transition: box-shadow 0.15s ease-in-out;
}

input:focus + label,
input:active + label {
  border-radius: 3px;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
</style>
