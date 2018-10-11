<template>
  <form :id="id+'__form'" @submit="submit" readonly="true">
    <fieldset v-for="(field, fieldIndex) in form.fields" :key="field.name">
      <p class="validation-error" v-show="field.message">{{field.message}}</p>
      <label v-if="!!field.label">
        {{field.label}}:
        <input :type="field.inputType" :class="{'field-invalid': field.isValid}" v-model="field.value" :autocomplete="field.name" :tabindex="[isActive ? fieldIndex : -1]" :required="!!field.isRequired">
      </label>
    </fieldset>
      <input class="button" type="submit" value="Submit" :tabindex="isActive ? 100 : -1">
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
  props: ['id', 'isActive', 'form']
}
</script>

<style>
input {
  font-size: 0.9em;
  border-bottom:1px solid white;
}
input::placeholder {
  color:white;
}

</style>
