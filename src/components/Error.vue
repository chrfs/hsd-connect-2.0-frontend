<template>
  <div class="error-page">
    <font-awesome-icon class="fa-icon" icon="frown">NOT FOUND</font-awesome-icon>
    <div class="error-page__content text-center">
      <h2 class="error-page__header">WOOOPS</h2>
      <slot class="error-page__message" name="message" />
      <slot class="error-page__button" name="action" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['message', 'action']
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25%;
  color: $baseGrey;
  &__header {
    color: $baseGrey;
    margin: 0;
    font-family: 'Montserrat-Light';
  }
  &__message {
    font-family: 'Montserrat-Thin';
  }
  .fa-icon {
    width: 50px;
    height: 50px;
    margin-bottom: 15px;
  }
}
</style>
