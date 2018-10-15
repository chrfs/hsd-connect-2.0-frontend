<template>
  <header>
    <div id="header_logo">
      <img @click="changeComponent(WelcomeIndex)" src="../../assets/img/logo.jpg" alt="HSD" />
    </div>
    <ul id="header_menu">
      <li @click="changeComponent(WelcomeSignIn)">Login</li>
      <li @click="changeComponent(WelcomeSignUp)">Registrieren</li>
      <li @click="changeComponent(WelcomeAbout)">Über HSDConnect</li>
    </ul>
  </header>
</template>

<script>
export default {
  data: () => {
    return {
      WelcomeIndex: '/welcome',
      WelcomeSignIn: '/welcome/signin',
      WelcomeSignUp: '/welcome/signup',
      WelcomeAbout: '/welcome/about'
    }
  },
  methods: {
    changeComponent (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

header {
  grid-area: header;
  text-transform: uppercase;
  display: grid;
  grid-template-areas:  "figure menu";
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  align-self: center;
  #header_logo {
    grid-area: figure;
    img {
      width: 10em;
      min-width: 130px;
      cursor: pointer;
    }
  }
  #header_menu {
    grid-area: menu;
    font-size: 1em;
    display: flex;
    height: 100%;
    justify-content: flex-end;
    cursor: pointer;
    li {
      color: $baseBlue;
      padding: 0px 20px;
      align-self: center;
    }
  }
}
</style>
