<template>
  <form :id="name+'__form'" @submit="submit" readonly="true">
    <label v-for="(field, fieldKey, fieldIndex) in validation.fields" :key="fieldKey">
      <span class="validation-error" v-if="!field.isValid"> {{field.message}}</span>
      <input v-if="!!field.input" :type="field.type" :class="{'field-invalid' : !field.isValid}" :placeholder="field.placeholder" v-model="data[field.name]" :tabindex="[isActive ? fieldIndex : -1]" required>
    </label>
    <input class="button" type="submit" value="Login" :tabindex="isActive ? 100 : -1">
  </form>
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
input{
  border-bottom:1px solid white;
}
input::placeholder{
  color:white;
}

</style>
