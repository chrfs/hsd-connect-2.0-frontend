<template>
    <div id="login-background" class="login min-height-100vh">
      <h4>Login</h4>
      <Form id="login" @submit="submitLogin" :isActive="isActive" :form="form"></Form>
    </div>
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
          }
        }
      }
    }
  },
  methods: {
    submitLogin (user) {
      this.resetFormFieldMessages()
      this.$http.post(this.$httpRoutes.POST_LOGIN, user).then(({ data: { data } }) => {
        this.$store.dispatch('setAuthToken', data.authToken)
        this.resetFormFieldValues()
      }).catch(({response: {data}}) => {
        if (data.status >= 500) {
          this.form.fields.signin.message = 'An unexpected error has occurred.'
        } else if (data.data) {
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

<style lang="scss" scoped>
@import '../../assets/scss/variables';

.login {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #f2f2f2;
    position: relative;
    height: 100%;
    width: 100%;
    &#login-background{
      background: $blueGradient;
      min-height: 300px;
      @media (max-width: 991px){
        transform: translateX(0px);
      }
    }
    h4 {
      color:white;
      width: 300px;
      font-size: 0.9em;
    }
    #login__form {
      margin-top: 25px;
      #field-invalid {
        border-color: red;
      }
    }
}
</style>
