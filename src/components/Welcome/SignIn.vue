<template>
  <section class="login-background">
    <div class="login">
      <h4>Login</h4>
      <Form identifier="login" @submit="submitLogin" :isActive="isActive" :form="form"></Form>
    </div>
  </section>
</template>

<script>
import Form from '../../components/Form.vue'

export default {
  data: () => {
    return {
      form: {
        fields: {
          signin: {
            message: ''
          },
          email: {
            elementType: 'input',
            inputType: 'email',
            label: 'E-Mail',
            name: 'email',
            isRequired: true,
            message: ''
          },
          password: {
            elementType: 'input',
            inputType: 'password',
            label: 'Password',
            name: 'password',
            isRequired: true,
            message: ''
          },
          submit: {
            elementType: 'input',
            inputType: 'submit',
            value: 'Signin'
          }
        }
      }
    }
  },
  methods: {
    submitLogin (user) {
      this.resetFormFieldMessages()
      this.$http.post(this.$httpRoutes.POST_LOGIN, user).then(({ data: { data } }) => {
        // TODO: SET NOTIFICATION
        this.resetFormFieldValues()
        this.$router.go('/')
        this.$store.dispatch('setAuthToken', data.authToken)
        this.$store.dispatch('setUser', data.user)
      }).catch((res) => {
        const response = res.response
        if (!response || !response.data || response.data.status >= 500) {
          this.form.fields.signin.message = 'An unexpected error has occurred.'
          return
        }
        const data = response.data
        if (data.data) {
          this.form.fields.signin.message = data.data
        } else if (data.errors) {
          Object.keys(data.errors).forEach(entry => {
            this.form.fields[entry].message = data.errors[entry]
          })
        }
      })
    },
    resetFormFieldMessages () {
      Object.keys(this.form.fields).forEach(entry => {
        this.form.fields[entry].message = ''
      })
    },
    resetFormFieldValues () {
      Object.keys(this.form.fields).forEach(entry => {
        this.form.fields[entry].value = ''
      })
    }
  },
  components: { Form },
  props: ['isActive']
}

</script>

<style lang="scss">
@import '../../assets/scss/variables';

.login-background {
  background-image: $blueGradient;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  @media (max-width: 991px) {
    transform: translateX(0px);
  }
}
.login {
  width: 320px;
  h4, input, label, fieldset {
    color: white;
    width: 320px;
  }
}
</style>
