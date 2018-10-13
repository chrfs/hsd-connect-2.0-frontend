<template>
  <header class="row">
    <div class="col-4">
      <img id="header_logo" @click="changeComponent(WelcomeIndex)" src="../../assets/img/logo.jpg" alt="HSD" />
    </div>
    <div class="col-8">
      <ul id="header_menu">
        <li @click="changeComponent(WelcomeSignIn)">Login</li>
        <li @click="changeComponent(WelcomeSignUp)">Registrieren</li>
        <li @click="changeComponent(WelcomeAbout)">Über HSDConnect</li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  data: () => {
    return {
      WelcomeIndex: '/',
      WelcomeSignIn: '/signin',
      WelcomeSignUp: '/signup',
      WelcomeAbout: '/about'
    }
  },
  methods: {
    changeComponent (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/variables';

header{
  padding: 50px 20px;
  max-height: 180px;
  position: absolute;
  text-transform: uppercase;
  top: 0;
  width: 100%;
  #header_logo {
    width: 8em;
    max-width: 150px;
    cursor: pointer
  }
  #header_menu {
    display: flex;
    justify-content: space-around;
    font-size: 1em;
    height: 100%;
    align-items: center;
    max-width: 500px;
    flex-direction: flex-end;
    margin-left: auto;
    cursor: pointer;
    li {
      color: $baseBlue;
    }
  }
}
</style>
