<template>
    <section class="register-background">
      <div class="register">
        <h4>Register</h4>
        <Form identifier="register" @submit="submitRegister" :isActive="isActive" :form="form"></Form>
      </div>
    </section>
</template>

<script>
import Form from '../Form.vue'

export default {
  data: () => {
    return {
      form: {
        fields: {
          signup: {
            message: ''
          },
          email: {
            elementType: 'input',
            inputType: 'email',
            label: 'E-Mail',
            isRequired: true,
            name: 'email',
            message: ''
          },
          password: {
            elementType: 'input',
            inputType: 'password',
            label: 'Password',
            isRequired: true,
            name: 'password',
            message: ''
          },
          confirmPassword: {
            elementType: 'input',
            inputType: 'password',
            label: 'Password bestätigen',
            isRequired: true,
            name: 'confirmPassword',
            message: ''
          },
          submit: {
            elementType: 'input',
            inputType: 'submit',
            value: 'Signup'
          }
        }
      }
    }
  },
  methods: {
    submitRegister (user) {
      if (user.confirmPassword !== user.password) {
        this.form.fields.confirmPassword.message = 'Your passwords are not machting, please check your credentials.'
        return
      }
      this.resetFormFieldMessages()
      this.$http
        .post(this.$httpRoutes['POST_REGISTER'], user).then(({ data: { data } }) => {
          // TODO: SET NOTIFICATION
          // this.form.fields.signup.message = data
          this.resetFormFieldValues()
          this.$router.push('/welcome/signin')
        }).catch((res) => {
          const response = res.response
          if (!response || !response.data || response.data.status >= 500) {
            this.form.fields.signup.message = 'An unexpected error has occurred.'
            return
          }
          const data = response.data
          if (data.data) {
            this.form.fields.signup.message = data.data
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

.register-background {
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
.register {
  width: 320px;
  h4, input, label, fieldset {
    color: white;
    width: 320px;
  }
}
</style>
