<template>
    <div id="register-background" class="register min-height-100vh">
      <h3>Register</h3>
      <Form name="register" @submit="submitRegister" :validation="validation" :data="user"></Form>
    </div>
</template>

<script>
import Form from '../../components/partial/Form.vue';

export default {
  data: () => {
    return {
      user: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      validation: {
        fields: {
          register: {
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
          },
          confirmPassword: {
            input: true,
            placeholder: 'Password bestätigen',
            name: 'confirmPassword',
            isValid: true,
            type: 'password',
            message: ''
          }
        }
      }
    };
  },
  methods: {
    submitRegister() {
      if (this.user.confirmPassword === this.user.password) {
        this.$http
          .post(this.$httpRoutes['POST_REGISTER'], { user: this.user })
          .then(({ response }) => {})
          .catch(({ response }) => {
            if(!!response && !!response.data && response.data.status === 'error') {
              const data = response.data;
              Object.keys(data.errors).forEach(entry => {
                this.validation.fields[entry].message = data.errors[entry].message;
                this.validation.fields[entry].isValid = false;
              });
            } else {
              throw new Error('Unexpected response.');
            }
          });
      } else {
        this.validation.fields.confirmPassword.message = 'Passwörter stimmen nicht überein, bitte prüfe Deine Eingaben.';
          this.validation.fields.confirmPassword.isValid = false;
      }
    }
  },
  components: { Form }
};
</script>

<style lang="scss">
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
    background: #f2f2f2;
    min-height: 300px;
    @media (max-width: 991px) {
      transform: translateX(0px);
    }
  }
  h3 {
    width: 300px;
  }
  #register__form {
    margin-top: 25px;
    #field-invalid {
      border-color: red;
    }
  }
}
</style>
