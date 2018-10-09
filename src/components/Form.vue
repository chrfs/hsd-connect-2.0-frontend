<template>
  <form :id="id+'__form'" @submit="submit" readonly="true">
    <label v-for="(field, fieldKey, fieldIndex) in form.fields" :key="fieldKey">
      <span class="validation-error" v-if="field.message">{{field.message}}</span>
      <input v-if="isInputElement(field.elementType)" :type="field.inputType" :class="{'field-invalid': field.isValid}" :placeholder="field.placeholder" v-model="field.value" :autocomplete="field.name" :tabindex="[isActive ? fieldIndex : -1]" :required="!!field.isRequired">
    </label>
    <input class="button" type="submit" value="Login" :tabindex="isActive ? 100 : -1">
  </form>
</template>

<script>
export default {
  methods: {
    isInputElement (elementType) {
      return elementType === 'input'
    },
    submit (event) {
      event.preventDefault()
      const formData = this.getFormData()
      this.$emit('submit', formData)
    },
    getFormData () {
      const formData = this.form.fields.reduce((fields, fieldName) => {
        const fieldValue = this.form.fields[fieldName].value
        if (!fieldValue) {
          return fields
        }
        fields[fieldName] = fieldValue
        return fields
      }, {})
      return formData
    }
  },
  props: ['id', 'isActive', 'form']
}
</script>

<style>
input{
  font-size: 0.9em;
  border-bottom:1px solid white;
}
input::placeholder{
  color:white;
}

</style>
