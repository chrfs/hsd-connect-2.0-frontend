<template>
  <header>
    <div id="header-logo">
      <img @click="changeComponent(WelcomeIndex)" src="../../assets/img/logo.jpg" alt="HSD" />
    </div>
    <ul id="header-menu" :class="{'isActive': responseMenuIsActive}">
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
      WelcomeAbout: '/welcome/about',
      responseMenuIsActive: false
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
  grid-template-areas:  "logo . menu";
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto auto;
  align-self: center;
  @media(max-width: 992px) {
    grid-template-areas: "logo menu";
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 100px;
    position: fixed;
    top: 0px;
    left: 0px;
    background: white;
    z-index: 2;
    width: 100vw;
    padding: 0px 20px;
    border-bottom: 2px solid $baseBlue;
    box-shadow: 0px -4px 10px 3px $baseBlue;
  }
  #header-logo {
    grid-area: logo;
    align-self: center;
    img {
      width: 9em;
      max-width: 200px;
      cursor: pointer;
    }
  }

  #header-menu {
    grid-area: menu;
    font-size: 1em;
    display: flex;
    height: 100%;
    justify-content: flex-end;
    align-items: center;
    cursor: pointer;
    li {
      color: $baseBlue;
      padding: 0px 20px;
    }
    @media(max-width: 992px) {
      li {
        padding: 0px;
        font-size: 15px;
      }
      grid-column: auto-fill;
      justify-content: space-around;
      display: flex;
      flex-direction: column;
      grid-area: menu;
      align-items: flex-start;
    } 
  }
}
</style>
