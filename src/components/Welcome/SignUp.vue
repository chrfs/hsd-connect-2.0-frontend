<template>
    <div id="register-background" class="register min-height-100vh">
      <h4>Register</h4>
      <Form identifier="register" @submit="submitRegister" :isActive="isActive" :form="form"></Form>
    </div>
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
          this.$router.push('/')
        }).catch(({ response: { data } }) => {
          if (data.status >= 500) {
            // TODO: SET NOTIFICATION
            this.form.fields.signup.message = 'An unexpected error has occurred.'
          } else if (data.data) {
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

.register {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f2f2f2;
  position: relative;
  height: 100%;
  width: 100%;
  input, label {
    color: white;
  }
  &#register-background {
    background-image: $blueGradient;
    min-height: 300px;
    @media (max-width: 991px) {
      transform: translateX(0px);
    }
  }
  h4 {
    color: white;
    width: 300px;
  }
}
</style>
