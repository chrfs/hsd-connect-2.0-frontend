<template>
  <fieldset class="form__fieldset">
    <label v-html="label"></label>
    <slot />
  </fieldset>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data: () => ({}),
  props: {
    label: {
      type: String,
      default: () => ''
    },
    isRequired: {
      type: Boolean,
      default: () => false
    }
  }
});
</script>

<style lang="scss"></style>
