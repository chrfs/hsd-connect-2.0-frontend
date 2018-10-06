<template>
  <ul>
    <li>Projects</li>
    <li>Profil</li>
    <li>Messages</li>
  </ul>
</template>

<script>
export default {
  methods: {
    submit (event) {
      event.preventDefault()
      this.$emit('submit')
    }
  },
  props: ['name', 'validation', 'data', 'isActive']
}
</script>

<style>

</style>
