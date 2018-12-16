<template>
    <section class="welcome-right-background">
      <div class="welcome-right-form">
        <h4>Register</h4>
       <form id="register-form" @submit="submitRegister">
        <fieldset>
          <p class="text-error" v-text="fields.notification.message"></p>
        </fieldset>
        <fieldset>
          <label>E-Mail:</label>
          <input type="email" :class="{'field-invalid': !!fields.email.message}" v-model="fields.email.value" autocomplete="on" required="true">
          <p class="text-error" v-show="fields.email.message" v-text="fields.email.message"></p>
        </fieldset>
        <fieldset>
          <label>Password:</label>
          <input type="password" :class="{'field-invalid': !!fields.password.message}" v-model="fields.password.value" autocomplete="on" required="true">
           <p class="text-error" v-show="fields.password.message" v-text="fields.password.message"></p>
        </fieldset>
        <fieldset>
          <label>Password repeat:</label>
          <input type="password" :class="{'field-invalid': !!fields.confirmPassword.message}" v-model="fields.confirmPassword.value" autocomplete="off" required="true">
           <p class="text-error" v-show="fields.confirmPassword.message" v-text="fields.confirmPassword.message"></p>
        </fieldset>
        <input type="submit" class="button" value="Signup">
      </form>
      </div>
    </section>
</template>

<script>
export default {
  data: () => {
    return {
      fields: {
        notification: {
          message: ''
        },
        email: {
          message: '',
          value: ''
        },
        password: {
          message: '',
          value: ''
        },
        confirmPassword: {
          message: '',
          value: ''
        }
      }
    }
  },
  methods: {
    submitRegister (e) {
      e.preventDefault()
      const user = this.getFieldValues()
      if (user.confirmPassword !== user.password) {
        this.fields.confirmPassword.message = 'Your passwords are not machting, please check your credentials.'
        return
      }
      this.resetFormFieldMessages()
      this.$http
        .post(this.$httpRoutes['POST_REGISTER'], user).then(({ data: { data } }) => {
          // TODO: SET NOTIFICATION
          // this.fields.notification.message = data
          this.resetFormFieldValues()
          this.$router.push('/welcome/signin')
        }).catch((res) => {
          const response = res.response
          if (!response || !response.data || response.data.status >= 500) {
            this.fields.notification.message = 'An unexpected error has occurred.'
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
  }
}
</script>

<style lang="scss">
</style>
