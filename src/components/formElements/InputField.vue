<template>
  <FormElement :label="label">
    <input
      :type="type"
      v-model="inputValue"
      :minlength="minlength"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
    />
    <p v-show="message" class="text--error">{{ message }}</p>
  </FormElement>
</template>

<script lang="ts">
import Vue from 'vue';

import FormElement from './FormElement.vue';

export default Vue.extend({
  data: (): any => ({
    inputValue: null
  }),
  watch: {
    inputValue(newValue: string | number): void {
      this.$emit('change', newValue);
    }
  },
  components: {
    FormElement
  },
  props: {
    label: {
      required: true,
      type: String
    },
    type: {
      type: String,
      required: true
    },
    placeholder: {
      required: false,
      type: String
    },
    minlength: {
      type: Number,
      default: () => -1
    },
    maxlength: {
      type: Number,
      default: () => -1
    },
    autocomplete: {
      type: String,
      required: false,
      default: () => ''
    },
    message: {
      type: String,
      required: false,
      default: () => ''
    }
  },
  methods: {
    emitChange(value: any) {}
  }
});
</script>

<style lang="scss"></style>
