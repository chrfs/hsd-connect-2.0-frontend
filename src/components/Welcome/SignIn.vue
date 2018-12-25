<template>
  <section class="welcome__right__background">
    <div class="welcome__right__content">
      <h4>Login</h4>
      <FormGenerator identifier="login" @updateForm="updateForm" @submit="submitLogin" :isActive="isActive" :fields="fields"></FormGenerator>
    </div>
  </section>
</template>

<script>
import FormGenerator from '../FormGenerator'

export default {
  data: () => {
    return {
      fields: {
        email: {
          elementType: 'input',
          inputType: 'email',
          label: 'E-Mail',
          isRequired: true
        },
        password: {
          elementType: 'input',
          inputType: 'password',
          label: 'Password',
          isRequired: true
        },
        submit: {
          elementType: 'input',
          inputType: 'submit',
          value: 'Signin',
          noFormData: true
        }
      }
    }
  },
  methods: {
    updateForm (fields) {
      const currentFields = JSON.parse(JSON.stringify(fields || this.fields))
      this.fields = {}
      this.$nextTick(function () {
        this.fields = JSON.parse(JSON.stringify(currentFields))
      })
    },
    submitLogin (user) {
      this.resetFormFieldMessages()
      this.$http.post('/users/auth', user).then(({ data: { data } }) => {
        // TODO: SET NOTIFICATION
        this.resetFormFieldValues()
        this.$router.go('/')
        this.$store.dispatch('user/setAuthToken', data.authToken)
        this.$store.dispatch('user/setUser', data.user)
      }).catch((res) => {
        const response = res.response
        if (!response || !response.data || response.data.status >= 500) {
          this.fields.notification.message = 'An unexpected error has occurred.'
          this.$store.dispatch('user/setAuthToken', null)
          return
        }
        const data = response.data
        if (data.data) {
          this.fields.notification.message = data.data
        } else if (data.errors) {
          Object.keys(data.errors).forEach(entry => {
            this.fields[entry].message = data.errors[entry]
          })
        }
      })
    },
    resetFormFieldMessages () {
      Object.keys(this.fields).forEach(entry => {
        this.fields[entry].message = ''
      })
    },
    resetFormFieldValues () {
      Object.keys(this.fields).forEach(entry => {
        this.fields[entry].value = ''
      })
    },
    getFieldValues () {
      return Object.keys(this.fields).reduce((acc, fieldName) => {
        acc[fieldName] = this.fields[fieldName].value
        return acc
      }, {})
    }
  },
  components: { FormGenerator },
  props: ['isActive']
}

</script>

<style lang="scss">
</style>
