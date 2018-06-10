<template>
  <header class="row">
    <div class="col-4">
      <a href="/"><img id="header__logo" src="../assets/img/hsd_ci.png" alt="HSD" /></a>
    </div>
    <div class="col-8">
      <ul id="header__menu">
        <li><a href="login">Login</a></li>
        <li><a href="register">Registrieren</a></li>
        <li><a href="about-us">Über HSDConnect</a></li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {

};
</script>

<style lang="scss">
  header{
    padding-top: 50px;
    padding-bottom: 50px;
    max-height: 180px;
    position: absolute;
    top: 0;
    width: 100%;
    #header__logo {
      width: 8em;
      max-width: 150px;
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
