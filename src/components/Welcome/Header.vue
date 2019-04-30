<template>
  <header>
    <div class="container-responsive">
      <div class="header-logo">
        <img @click="changeComponent(WelcomeIndex, '0px', true)" src="../../assets/img/logo.jpg" alt="HSD" />
      </div>
      <div class="header-burger__icon" @click="toogleReponsiveMenu">
        <div class="burger-icon__clickable">
          <div class="burger-icon__bars"></div>
        </div>
      </div>
    </div>
    <transition name="translate-header">
      <ul
        class="header-menu"
        :class="isResponsive && resizingDone ? (responseMenuIsActive ? 'header-menu--open' : 'header-menu--close') : ''"
      >
        <li @click="changeComponent(WelcomeSignIn)">Login</li>
        <li @click="changeComponent(WelcomeSignUp)">Registrieren</li>
        <li @click="changeComponent(WelcomeAbout)">Über HSDConnect</li>
        <li @click="toogleReponsiveMenu" class="header-menu__close-icon">
          <font-awesome-icon icon="times" />
        </li>
      </ul>
    </transition>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data: () => ({
    WelcomeIndex: '/welcome',
    WelcomeSignIn: '/welcome/signin',
    WelcomeSignUp: '/welcome/signup',
    WelcomeAbout: '/welcome/about',
    responseMenuIsActive: false,
    windowWidth: window.innerWidth,
    resizingDone: true
  }),
  watch: {
    windowWidth(newValue) {
      this.responseMenuIsActive = false;
    }
  },
  methods: {
    changeComponent(path: string, position: number, closeMenu: boolean) {
      if (closeMenu) {
        this.responseMenuIsActive = false;
      } else {
        this.toogleReponsiveMenu();
      }

      this.$router.push(path);
      if (this.isResponsive) {
        window.scroll({
          top: position || document.body.scrollHeight,
          behavior: 'smooth'
        });
      }
    },
    toogleReponsiveMenu() {
      this.responseMenuIsActive = !this.responseMenuIsActive;
    }
  },
  computed: {
    isResponsive(): boolean {
      return this.windowWidth < 992;
    }
  },
  mounted(): void {
    let resizeId: any;
    window.addEventListener('resize', () => {
      this.resizingDone = false;
      clearTimeout(resizeId);
      resizeId = setTimeout(() => {
        this.resizingDone = true;
      }, 500);
      this.windowWidth = window.innerWidth;
    });
  }
});
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

header {
  grid-area: header;
  text-transform: uppercase;
  display: grid;
  /* autoprefixer: off */
  grid-template-areas: 'logo . menu';
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto auto;
  // align-self: center;
  @media (max-width: 992px) {
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 2;
    width: 100vw;
    .container-responsive {
      grid-template-areas: 'logo . burgericon';
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 60px;
      display: grid;
      z-index: 2;
      width: inherit;
      background: $baseWhite;
      padding: 0px 20px;
      box-shadow: 0px -4px 10px 3px $baseBlue;
      // border-bottom: 2px solid $baseBlue;
    }
  }
  .header-logo {
    grid-area: logo;
    align-self: center;
    img {
      width: 9em;
      max-width: 200px;
      cursor: pointer;
    }
  }
  .header-burger__icon {
    display: none;
    grid-area: burgericon;
    align-self: center;
    .burger-icon__clickable {
      display: flex;
      margin-left: auto;
    }
    @media (max-width: 992px) {
      display: block;
    }
  }
  .header-menu {
    font-size: 1em;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: auto 0;
    cursor: pointer;
    li {
      color: $baseBlue;
      padding: 0px 20px;
      &.header-menu__close-icon {
        display: none;
        justify-content: center;
        font-size: 1.4em;
        > svg {
          fill: $baseBlue;
        }
      }
    }
    @media (max-width: 992px) {
      grid-column: auto-fill;
      justify-content: space-evenly;
      display: flex;
      flex-direction: column;
      position: absolute;
      height: 100vh;
      top: 60px;
      left: 0px;
      right: 0px;
      background: $baseWhite;
      border-bottom: 1px solid $baseBlue;
      transform: translateY(-100%);
      li {
        padding: 12px 0;
        width: 100%;
        height: 100%;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        font-family: 'Montserrat-SemiBold';
        &.header-menu__close-icon {
          display: inline-flex;
        }
      }
      &--close,
      &--open {
        transition: transform 0.3s ease-in-out;
      }
      &--close {
        transform: translateY(-100%);
      }
      &--open {
        transform: translateY(0%);
      }
    }
  }
}
</style>
