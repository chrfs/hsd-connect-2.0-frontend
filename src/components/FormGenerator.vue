<template>
  <form :id="identifier+'-form'" @submit="submit">
    <fieldset v-for="(field, fieldIndex) in fields" :key="field+'-'+fieldIndex">
      <label v-if="field.label">
        {{field.label}}:
      </label>
      <input v-if="isInputElement(field.elementType)"  :type="field.inputType" :class="{'field-invalid': field.isValid, 'button': isSubmitType(field.inputType)}" v-model="field.value" autocomplete="on" :tabindex="[isActive ? fieldIndex : -1]" :required="field.isRequired === true">
      <textarea v-if="isTextareaElement(field.elementType)" :class="{'field-invalid': field.isValid}" v-model="field.value" :tabindex="[isActive ? fieldIndex : -1]" :required="field.isRequired"></textarea>
      <p class="text-error" v-text="field.message"></p>
    </fieldset>
  </form>
</template>

<script>
export default {
  methods: {
    isInputElement (elementType) {
      return elementType === 'input'
    },
    isTextareaElement (elementType) {
      return elementType === 'textarea'
    },
    isSubmitType (inputType) {
      return inputType === 'submit'
    },
    prepareFields () {
      this.fields.notification = {}
      Object.keys(this.fields).forEach(fieldName => {
        this.fields[fieldName].message = ''
      })
    },
    submit (event) {
      event.preventDefault()
      const formData = this.getFormData()
      this.$emit('submit', formData)
    },
    getFormData () {
      const formData = Object.keys(this.fields).reduce((acc, fieldName) => {
        const fieldValue = this.fields[fieldName].value
        if (!fieldValue) {
          return acc
        }
        acc[fieldName] = fieldValue
        return acc
      }, {})
      return formData
    }
  },
  props: ['identifier', 'isActive', 'fields'],
  mounted () {
    this.prepareFields()
  }
}
</script>

<style>
</style>
