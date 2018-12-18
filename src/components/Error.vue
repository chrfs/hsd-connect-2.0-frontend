<template>
  <div class="error-page">
    <font-awesome-icon class="fa-icon" icon="frown">NOT FOUND</font-awesome-icon>
    <div class="error-page-content text-center">
      <h2 class="error-page-header">WOOOPS</h2>
      <slot class="error-page-message" name="message"/>
      <slot class="error-page-button" name="action"/>
    </div>
  </div>
</template>

<script>
export default {
  props: ['message', 'action']
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25%;
  color: $baseGrey;
  .error-page-header {
    color: $baseGrey;
    margin: 0;
    font-family: "Montserrat-Light"
  }
  .error-page-message {
    font-family: "Montserrat-Thin"
  }
  .fa-icon {
    width: 50px;
    height: 50px;
    margin-bottom: 15px;
  }
}

</style>
