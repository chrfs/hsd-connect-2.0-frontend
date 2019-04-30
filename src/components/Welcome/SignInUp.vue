<template>
  <section class="welcome__background">
    <div class="welcome__content">
      <div v-if="isSignIn">
        <h4>Login</h4>
        <p class="text--error">{{ formMessage }}</p>
        <form class="form form__color--inversed">
          <InputField
            @change="value => (signIn.email = value)"
            :label="'E-Mail:'"
            :type="'email'"
            required="true"
            :autocomplete="'email'"
            :message="formErrors.email"
          />
          <InputField
            @change="value => (signIn.password = value)"
            :label="'Password:'"
            :type="'password'"
            required="true"
            :autocomplete="'password'"
            :message="formErrors.password"
          />
          <button @click="postSignIn">Send</button>
        </form>
      </div>
      <div v-if="isSignUp">
        <h4>Register</h4>
        <p class="text--error">{{ formMessage }}</p>
        <form class="form form__color--inversed" :tabindex="isActive ? -1 : 0">
          <p class=""></p>
          <InputField
            @change="value => (signUp.email = value)"
            :label="'E-Mail:'"
            :type="'email'"
            required="true"
            :autocomplete="'email'"
            :message="formErrors.email"
          />
          <InputField
            @change="value => (signUp.password = value)"
            :label="'Password:'"
            :type="'password'"
            required="true"
            :autocomplete="'password'"
            :message="formErrors.password"
          />
          <InputField
            @change="value => (signUp.confirmPassword = value)"
            :label="'Password bestätigen:'"
            :type="'password'"
            required="true"
            :autocomplete="'passwordRepeat'"
            :message="formErrors.confirmPassword"
          />
          <button @click="postSignUp">Send</button>
        </form>
      </div>
    </div>
  </section>
</template>
f
<script lang="ts">
import Vue from 'vue';
import InputField from '../formElements/InputField.vue';

export default Vue.extend({
  data: (): any => ({
    signIn: {
      email: '',
      password: ''
    },
    signUp: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    formErrors: {},
    formMessage: ''
  }),
  methods: {
    postSignIn() {
      this.formErrors = {};
      this.formMessage = '';
      (this as any).$http
        .post('/users/auth', this.signIn)
        .then(({ data: { data } }: any) => {
          this.$router.go();
          this.$store.dispatch('user/setAuthToken', data.authToken);
          this.$store.dispatch('user/setUser', data.user);
        })
        .catch((res: any) => {
          const data = res.response ? res.response.data : false;
          if (!data) {
            this.formMessage = 'An unexpected error has occurred.';
          } else if (data.data) {
            this.formMessage = data.data;
          } else if (data.errors) {
            this.formErrors = JSON.parse(JSON.stringify(data.errors));
          }
        });
    },
    postSignUp() {
      if (this.signUp.confirmPassword !== this.signUp.password) {
        this.formErrors = { confirmPassword: 'Your passwords are not machting, please check your credentials.' };
        return;
      }
      this.formErrors = {};
      this.formMessage = '';
      this.$http
        .post('/users', this.signUp)
        .then(({ data: { data } }: any) => {
          this.$router.push('/welcome/signin');
        })
        .catch((res: any) => {
          const { response } = res;
          if (!response || !response.data || response.data.status >= 500) {
            this.formMessage = 'An unexpected error has occurred.';
            return;
          }
          const { data } = response;
          if (data.data) {
            // TODO: SET NOTIFICATION
            this.formMessage = data.data;
          } else if (data.errors) {
            this.formErrors = JSON.parse(JSON.stringify(data.errors));
          }
        });
    }
  },
  props: {
    isActive: {
      type: Boolean,
      default: () => true
    },
    isSignIn: {
      type: Boolean,
      default: () => false
    },
    isSignUp: {
      type: Boolean,
      default: () => false
    }
  },
  components: { InputField }
});
</script>

<style lang="scss"></style>
