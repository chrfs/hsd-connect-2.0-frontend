<template>
  <header>
    <div class="container-responsive">
      <div id="header-logo">
        <img @click="changeComponent(WelcomeIndex, '0px', true)" src="../../assets/img/logo.jpg" alt="HSD" />
      </div>
      <div id="header-burger-icon" @click="toogleReponsiveMenu">
        <div class="burger-icon-clickable">
          <div class="burger-icon-bars"></div>
        </div>
      </div>
    </div>
    <transition name="translate-header">
      <ul id="header-menu" v-show="showMenu">
        <li @click="changeComponent(WelcomeSignIn)">Login</li>
        <li @click="changeComponent(WelcomeSignUp)">Registrieren</li>
        <li @click="changeComponent(WelcomeAbout)">Über HSDConnect</li>
        <li @click="toogleReponsiveMenu" class="close-menu"><font-awesome-icon icon="times" /></li>
      </ul>
    </transition>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => {
    return {
      WelcomeIndex: '/welcome',
      WelcomeSignIn: '/welcome/signin',
      WelcomeSignUp: '/welcome/signup',
      WelcomeAbout: '/welcome/about',
      responseMenuIsActive: true,
      windowWidth: window.innerWidth
    }
  },
  methods: {
    changeComponent (path: string, position: number, closeMenu: boolean) {
      if (closeMenu) {
        this.responseMenuIsActive = false
      } else this.toogleReponsiveMenu()

      this.$router.push(path)
      if (this.isResponsive) {
        window.scroll({
          top: position || document.body.scrollHeight,
          behavior: 'smooth'
        })
      }
    },
    toogleReponsiveMenu () {
      this.responseMenuIsActive = !this.responseMenuIsActive
    }
  },
  computed: {
    isResponsive (): boolean {
      return this.windowWidth < 992
    },
    showMenu (): boolean {
      return this.isResponsive ? this.responseMenuIsActive : true
    }
  },
  mounted (): void {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })
  }
})
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

header {
  grid-area: header;
  text-transform: uppercase;
  display: grid;
  /* autoprefixer: off */
  grid-template-areas:  "logo . menu";
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto auto;
  // align-self: center;
  @media(max-width: 992px) {
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 2;
    width: 100vw;
    .container-responsive {
      grid-template-areas: "logo . burgericon";
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 60px;
      display: grid;
      z-index: 2;
      width: inherit;
      background: white;
      padding: 0px 20px;
      box-shadow: 0px -4px 10px 3px $baseBlue;
      // border-bottom: 2px solid $baseBlue;
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
    // height: 100vh;
    justify-content: flex-end;
    align-items: center;
    margin: auto 0;
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
        // border-bottom: 2px solid $baseGrey;
        width: 100%;
        text-align: center;
        font-size: 15px;
        font-family: 'Montserrat-SemiBold';
        &.close-menu {
          display: inline-flex;
        }
      }
      grid-column: auto-fill;
      justify-content:space-evenly;
      display: flex;
      flex-direction: column;
      position: absolute;
      height: 100vh;
      top: 60px;
      left: 0px;
      right: 0px;
      background: white;
      border-bottom: 1px solid $baseBlue;
    }
  }
}

  .translate-header-enter-active {
    transition: opacity .3s cubic-bezier(.41,.57,.43,.52), transform .3s cubic-bezier(.41,.57,.43,.52), visibility .3s ease-in-out;;
    transform: translateX(0px);
  }
  .translate-header-leave-active {
    transition: opacity .3s cubic-bezier(.41,.57,.43,.52), transform .3s cubic-bezier(.41,.57,.43,.52), visibility .3s ease-in-out;;
    opacity: 1;
    transform: translateY(0px);
    visibility: visible;
  }
  .translate-header-enter, .translate-header-leave-to {
    opacity: 0;
    transform: translateY(-50%);
    visibility: hidden;
  }
</style>
