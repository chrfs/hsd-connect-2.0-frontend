<template>
  <form :id="identifier+'-form'" @submit="submit" readonly="true">
    <fieldset v-for="(field, fieldIndex) in form.fields" :key="field.name">
      <label v-if="field.label">
        {{field.label}}:
      </label>
      <input v-if="isInputElement(field.elementType)"  :type="field.inputType" :class="{'field-invalid': field.isValid, 'button': isSubmitType(field.inputType)}" v-model="field.value" :autocomplete="field.name" :tabindex="[isActive ? fieldIndex : -1]" :required="field.isRequired === true">
      <p class="text-error" v-show="field.message">{{field.message}}</p>
    </fieldset>
  </form>
</template>

<script>
export default {
  methods: {
    isInputElement (elementType) {
      return elementType === 'input'
    },
    isSubmitType (inputType) {
      return inputType === 'submit'
    },
    submit (event) {
      event.preventDefault()
      const formData = this.getFormData()
      this.$emit('submit', formData)
    },
    getFormData () {
      const formData = Object.keys(this.form.fields).reduce((fields, fieldName) => {
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
  props: ['identifier', 'isActive', 'form']
}
</script>

<style>
</style>
