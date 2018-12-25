<template>
  <header class="row">
    <div class="col-6 col-sm-6  col-lg-2 flex-justify header__logo ">
      <img src="../assets/img/logo.jpg" alt="Hochschule Düsseldorf CI" >
    </div>
    <div class="col-6 col-sm-6 col-lg-10 flex-justify">
      <div class="header__submenus flex-justify">
        <div class="header__profile">
          <img class="border-round" src="../assets/img/profile_image.jpg" alt="Profile-Igage">
        </div>
        <div class="header__profile">
          <img class="border-round" src="../assets/img/profile_image.jpg" alt="Profile-Igage">
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import ProfilCard from './ProfilCard'
export default {
  components: { ProfilCard }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';

header {
  min-height: $headerHeight;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  .header__logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: inherit;
    min-height: $headerHeight;
   img { 
      width: 125px;
    }
  }
  .header__submenus {
    display: flex;
    align-items: flex-end;
    margin-left: auto;
    max-width: 300px;
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    .header__profile {
      img {
        width: 50px;
        height: 50px;
      }
    }
  }
}

</style>
