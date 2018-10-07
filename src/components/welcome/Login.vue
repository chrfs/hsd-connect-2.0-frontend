<template>
    <div id="login-background" class="login min-height-100vh">
      <h4>Login</h4>
      <Form name="login" @submit="submitLogin" :isActive="isActive" :validation="validation" :data="user"></Form>
    </div>
</template>

<script>
import Form from '../../components/partial/Form.vue'

export default {
  data: () => {
    return {
      user: {
        email: '',
        password: ''
      },
      validation: {
        fields: {
          login: {
            input: false,
            message: ''
          },
          email: {
            input: true,
            placeholder: 'E-Mail',
            name: 'email',
            isValid: true,
            type: 'email',
            message: ''
          },
          password: {
            input: true,
            placeholder: 'Password',
            name: 'password',
            isValid: true,
            type: 'password',
            message: ''
          }
        }
      }
    }
  },
  methods: {
    submitLogin () {
      this.$http.post(this.$httpRoutes.POST_LOGIN, { user: this.user }).then(({ data }) => {
        if (!!data && !!data.data && data.status === 'success') {
          const res = data.data
          this.$store.dispatch('setAuthToken', res.authToken)
        } else {
          throw new Error('Unexpected response.')
        }
      }).catch(({ response }) => {
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
