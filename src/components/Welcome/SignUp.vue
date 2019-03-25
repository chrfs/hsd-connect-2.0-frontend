<template>
  <section class="welcome__right__background">
    <div class="welcome__right__content">
      <h4>Register</h4>
      <FormGenerator
        identifier="register"
        @updateFields="updateFields"
        @submit="submitRegister"
        :isActive="isActive"
        :fields="fields"
      ></FormGenerator>
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
        confirmPassword: {
          elementType: 'input',
          inputType: 'password',
          label: 'Password bestätigen',
          isRequired: true
        },
        submit: {
          elementType: 'input',
          inputType: 'submit',
          value: 'Signup',
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
    submitRegister (user: any) {
      if (user.confirmPassword !== user.password) {
        this.fields.confirmPassword.message = 'Your passwords are not machting, please check your credentials.'
        return
      }
      this.resetFormFieldMessages()
      this.$http
        .post('/users', user)
        .then(({ data: { data } }: any) => {
          // TODO: SET NOTIFICATION
          // this.fields.notification.message = data
          this.resetFormFieldValues()
          this.$router.push('/welcome/signin')
        })
        .catch((res: any) => {
          const response = res.response
          if (!response || !response.data || response.data.status >= 500) {
            // TODO: SET NOTIFICATION
            // this.fields.notification.message = 'An unexpected error has occurred.'
            this.updateFields()
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
