<template>
  <component :is="currentComponent"></component>
</template>

<script>
import Welcome from './Welcome.vue'
import Projects from './Projects.vue'

export default {
  data: () => {
    return {}
  },
  computed: {
    authToken () {
      return this.$store.getters.authToken
    },
    currentComponent () {
      return this.authToken ? 'Projects' : 'Welcome'
    }
  },
  components: { Welcome, Projects }
}
</script>

<style lang="scss" scoped>
</style>
gi