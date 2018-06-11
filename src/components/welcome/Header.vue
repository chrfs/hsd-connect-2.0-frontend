<template>
  <header class="row">
    <div class="col-4">
      <img id="header__logo" @click="changeComponent" src="../../assets/img/hsd_ci.png" alt="HSD" />
    </div>
    <div class="col-8">
      <ul id="header__menu">
        <li><router-link to="login" exact>Login</router-link></li>
        <li><router-link to="register" exact>Registrieren</router-link></li>
        <li><router-link to="about-us" exact>Über HSDConnect</router-link></li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  data: () => {
    return {
      nextComponent: 'WelcomeIntro'
    };
  },
  methods: {
    changeComponent() {
      this.$emit('changeComponent', this.nextComponent);
    }
  }
};
</script>

<style lang="scss">
header{
  padding: 50px 20px;
  max-height: 180px;
  position: absolute;
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
