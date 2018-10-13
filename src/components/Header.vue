<template>
  <div class="row header">
    <div class="col-3">
      <router-link to="/"><img id="header_logo" src="../assets/img/logo.jpg" alt="HSD" /></router-link>
    </div>
    <div class="col-3">
      <form class="header_search">
        <input placeholder="Suche">
      </form>
    </div>
    <div class="col-6">
      <img id="header_profile-image" src="../assets/img/profile_image.jpg" alt="Profilfoto"/>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';
.header {
  padding-bottom: 20px;
  text-transform: uppercase;
  height: 10vh;
  width: 100vw;
  position: fixed;
  z-index: 1;
  background-color: white;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  #header_logo {
    position: absolute;
    bottom:0;
    left: 50px;
    width: 8em;
    max-width: 150px;
    cursor: pointer
  }
  input {
    position: absolute;
    bottom: 0;
    border-bottom: 1px solid $baseGrey;
    margin: 0;
    width: 200px;
    &::placeholder{
      color: $baseGrey;
    }
  }
  #header_profile-image {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-right: 60px;
    width: 40px;
    height: 40px;
    border-radius: 50px;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
