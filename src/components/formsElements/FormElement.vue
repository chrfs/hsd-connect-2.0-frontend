<template>
  <fielset>
    <label v-html="label"></label>
    <slot @change="emitChange"></slot>
  </fielset>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    label: {
      type: String,
      default: () => ''
    },
    isRequired: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    emitChange (key: string, value: any) {
      this.$emit('change', key, value)
    }
  }
})
</script>

<style lang="scss">

</style>
