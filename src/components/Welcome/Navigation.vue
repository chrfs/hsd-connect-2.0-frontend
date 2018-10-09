<template>
  <header class="row">
    <div class="col-4">
      <img id="header__logo" @click="changeComponent(WelcomeIntro)" src="../../assets/img/logo.jpg" alt="HSD" />
    </div>
    <div class="col-8">
      <ul id="header__menu">
        <li @click="changeComponent(WelcomeLogin)"><a href="#" onClick="event.preventDefault()">Login</a></li>
        <li @click="changeComponent(WelcomeRegister)"><a href="#" onClick="event.preventDefault()">Registrieren</a></li>
        <li @click="changeComponent(WelcomeAbout)"><a href="#" onClick="event.preventDefault()">Über HSDConnect</a></li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  data: () => {
    return {
      WelcomeIntro: 'WelcomeIntro',
      WelcomeLogin: 'WelcomeLogin',
      WelcomeRegister: 'WelcomeRegister',
      WelcomeAbout: 'WelcomeAbout'
    }
  },
  methods: {
    changeComponent (nextComponent) {
      this.$emit('changeComponent', nextComponent)
    }
  }
}
</script>

<style lang="scss">
header{
  padding: 50px 20px;
  max-height: 180px;
  position: absolute;
  text-transform: uppercase;
  top: 0;
  width: 100%;
  #header__logo {
    width: 8em;
    max-width: 150px;
    cursor: pointer
  }
  #header__menu {
    display: flex;
    justify-content: space-around;
    font-size: 1em;
    height: 100%;
    align-items: center;
    max-width: 500px;
    flex-direction: flex-end;
    margin-left: auto;
  }
}
</style>
