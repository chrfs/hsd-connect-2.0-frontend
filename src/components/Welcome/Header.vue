<template>
  <header>
    <div class="responsive-container">
      <div id="header-logo">
        <img @click="changeComponent(WelcomeIndex)" src="../../assets/img/logo.jpg" alt="HSD" />
      </div>
      <div id="header-burger-icon" @click="toogleReponsiveMenu">
        <div class="burger-icon-clickable">
          <div class="burger-icon-bars"></div>
        </div>
      </div>
    </div>
    <ul id="header-menu" :class="{'menu-active': responseMenuIsActive}">
      <li @click="changeComponent(WelcomeSignIn)">Login</li>
      <li @click="changeComponent(WelcomeSignUp)">Registrieren</li>
      <li @click="changeComponent(WelcomeAbout)">Über HSDConnect</li>
      <li @click="toogleReponsiveMenu" class="close-menu"><font-awesome-icon icon="times" /></li>
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
    },
    toogleReponsiveMenu () {
      this.responseMenuIsActive = !this.responseMenuIsActive
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
    grid-template-areas: none;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 2;
    width: 100vw;
    .responsive-container {
      grid-template-areas: "logo . burgericon";
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 60px;
      display: grid;
      z-index: 2;
      width: inherit;
      background: white;
      padding: 0px 20px;
      box-shadow: 0px -4px 10px 3px $baseBlue;
      border-bottom: 2px solid $baseBlue;
    }
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
  #header-burger-icon {
    display: none;
    grid-area: burgericon;
    align-self: center;
    .burger-icon-clickable {
      display: flex;
      margin-left: auto;
    }
    @media(max-width: 992px) {
      display: block;
    }
  }
  #header-menu {
    font-size: 1em;
    display: flex; 
    height: auto;
    justify-content: flex-end;
    align-items: center;
    margin: auto 0;
    user-select: none;
    cursor: pointer;
    li {
      color: $baseBlue;
      padding: 0px 20px;
      &.close-menu {
        display: none;
        justify-content: center;
        font-size: 1.4em;
        > svg {
          fill: $baseBlue
        }
      }
    }
    @media(max-width: 992px) {
      li {
        padding: 12px 0;
        border-bottom: 2px solid $baseGrey;
        width: 100%;
        text-align: center;
        font-size: 15px;
        &.close-menu {
          display: inline-flex;
        }
      }
      grid-column: auto-fill;
      justify-content: space-around;
      display: flex;
      flex-direction: column;
      transition: opacity .3s cubic-bezier(.41,.57,.43,.52), transform .3s cubic-bezier(.41,.57,.43,.52), visibility .3s ease-in-out;
      opacity: 0;
      position: absolute;
      top: 60px;
      left: 0px;
      right: 0px;
      background: white;
      transform: translateY(-50%);
      visibility: hidden;
      border-bottom: 1px solid $baseBlue;
      &.menu-active {
        opacity: 1;
        transform: translateY(0px);
        visibility: visible;
      }
    } 
  }
}
</style>
