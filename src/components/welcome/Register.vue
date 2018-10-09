<template>
    <div id="register-background" class="register min-height-100vh">
      <h4>Register</h4>
      <Form id="register" @submit="submitRegister" :isActive="isActive" :form="form"></Form>
    </div>
</template>

<script>
import Form from '../Form.vue'

export default {
  data: () => {
    return {
      form: {
        fields: {
          register: {
            message: ''
          },
          email: {
            elementType: 'input',
            inputType: 'email',
            placeholder: 'E-Mail',
            isRequired: true,
            name: 'email',
            message: ''
          },
          password: {
            elementType: 'input',
            inputType: 'password',
            placeholder: 'Password',
            isRequired: true,
            name: 'password',
            message: ''
          },
          confirmPassword: {
            elementType: 'input',
            inputType: 'password',
            placeholder: 'Password bestätigen',
            isRequired: true,
            name: 'confirmPassword',
            message: ''
          }
        }
      }
    }
  },
  methods: {
    submitRegister () {
      if (this.user.confirmPassword === this.user.password) {
        this.$http
          .post(this.$httpRoutes['POST_REGISTER'], { user: this.user })
          .then(({ response }) => {})
          .catch(({ response }) => {
            if (!!response && !!response.data && response.data.status === 'error') {
              const data = response.data
              Object.keys(data.errors).forEach(entry => {
                this.validation.fields[entry].message = data.errors[entry].message
                this.validation.fields[entry].isValid = false
              })
            } else {
              throw new Error('Unexpected response.')
            }
          })
      } else {
        this.validation.fields.confirmPassword.message = 'Passwörter stimmen nicht überein, bitte prüfe Deine Eingaben.'
        this.validation.fields.confirmPassword.isValid = false
      }
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
  &#register-background {
    background-image: $blueGradient;
    min-height: 300px;
    @media (max-width: 991px) {
      transform: translateX(0px);
    }
  }
  h4 {
    color:white;
    width: 300px;
    font-size: 0.9em;
  }
  #register__form {
    margin-top: 25px;
    #field-invalid {
      border-color: red;
    }
  }
}
</style>
