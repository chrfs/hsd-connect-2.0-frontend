<template>
  <section class="welcome__right__background">
    <div class="welcome__right__content">
      <h4>Login</h4>
      <FormGenerator identifier="login" @updateFields="updateFields" @submit="submitLogin" :isActive="isActive" :fields="fields"></FormGenerator>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import FormGenerator from '../FormGenerator.vue'

export default Vue.extend({
  data: (): any => {
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
    updateFields (fields: any) {
      const currentFields = JSON.parse(JSON.stringify(fields || this.fields))
      this.fields = {}
      this.$nextTick(() => {
        this.fields = JSON.parse(JSON.stringify(currentFields))
      })
    },
    submitLogin (user: any) {
      this.resetFormFieldMessages()
      this.$http.post('/users/auth', user).then(({ data: { data } }: any) => {
        // TODO: SET NOTIFICATION
        this.resetFormFieldValues()
        this.$router.go('/')
        this.$store.dispatch('user/setAuthToken', data.authToken)
        this.$store.dispatch('user/setUser', data.user)
        // this.updateFields()
      }).catch((res: any) => {
        const response = res.response
        if (!response || !response.data || response.data.status >= 500) {
          // TODO: SET NOTIFICATION
          // this.fields.notification.message = 'An unexpected error has occurred.'
          this.$store.dispatch('user/setAuthToken', null)
          return
        }
        const data = response.data
        if (data.data) {
          // TODO: SET NOTIFICATION
          // this.fields.notification.message = data.data
        } else if (data.errors) {
          Object.keys(data.errors).forEach(entry => {
            this.fields[entry].message = data.errors[entry]
          })
        }
        this.updateFields()
      })
    },
    resetFormFieldMessages () {
      Object.keys(this.fields).forEach(entry => {
        this.fields[entry].message = ''
      })
      this.updateFields()
    },
    resetFormFieldValues () {
      Object.keys(this.fields).forEach(entry => {
        this.fields[entry].value = ''
      })
      this.updateFields()
    },
    getFieldValues () {
      return Object.keys(this.fields).reduce((acc: any, fieldName: string) => {
        acc[fieldName] = this.fields[fieldName].value
        return acc
      }, {})
    }
  },
  components: { FormGenerator },
  props: ['isActive']
})
</script>

<style lang="scss">
</style>
