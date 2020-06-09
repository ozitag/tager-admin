<template>
  <base-form-group>
    <base-label v-if="Boolean(label)" :for="name">{{ label }}</base-label>
    <base-textarea
      v-if="type === 'textarea'"
      :id="name"
      :name="name"
      :value="value"
      @input="$emit('input', $event)"
    />
    <base-input
      v-else
      :id="name"
      :name="name"
      :type="type"
      :value="value"
      @input="$emit('input', $event)"
      @change="$emit('change', $event)"
    />

    <base-form-error v-if="Boolean(error)">{{ error }}</base-form-error>
  </base-form-group>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'FormField',
  props: {
    name: {
      type: String,
      required: true,
    },
    label: String,
    value: String,
    type: {
      type: String,
      default: 'text',
      validator(value): boolean {
        return [
          'text',
          'number',
          'email',
          'password',
          'date',
          'textarea',
        ].includes(value);
      },
    },
    error: String,
  },
  methods: {
    emitWithLog(eventName: string, event: Event) {
      console.log('FormField Event: ', eventName, event);
      this.$emit(eventName, event);
    },
  },
});
</script>

<style scoped lang="scss"></style>
