<template>
    <div id="login-background" class="login min-height-100vh">
      <h3>Login</h3>
      <form id="login__form">
        <input type="text" placeholder="E-Mail" v-model="user.email" required>
        <input type="password" placeholder="Passwort" v-model="user.password" required>
        <button @click="submitLogin">Login</button>
      </form>
    </div>
</template>

<script>
export default {
  data: () => {
    return {
      user: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    submitLogin(e) {
      e.preventDefault();
    }
  }
};
</script>

<style lang="scss">
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
      background: #f2f2f2;
      min-height: 300px;
      @media (max-width: 991px){
        transform: translateX(0px);
      }
    }
    h3 {
      width: 300px;
    }
    #login__form {
      margin-top: 25px;
    }
}
</style>
