<template>
  <input
    :checked="checked"
    type="checkbox"
    @change="$emit('change', $event.target.checked)"
  />
</template>

<script>
export default {
  name: 'Checkbox',
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: Boolean,
  },
};
</script>

<style scoped lang="scss">
input {
  position: absolute;
  margin-top: 0.3rem;
  -webkit-appearance: checkbox;
}
</style>
