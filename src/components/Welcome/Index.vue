<template>
  <div class="lets-connect">
    <div class="lets-connect__background">
      <button class="lets-connect__button" @click="changeComponent">Let's connect</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  methods: {
    changeComponent(): void {
      this.$router.push('/welcome/signin');
    }
  }
});
</script>

<style lang="scss">
@import '../../assets/scss/variables';

.lets-connect {
  height: 100%;
  width: 100%;
  min-height: 300px;
  background: white;
  &__background {
    height: 100%;
    background-image: url('../../assets/img/welcome/symbol_connect_white.svg'), $blueGradient;
    position: relative;
    background-size: cover;
    @media(max-width: 992px) {
      transform: translateY(24px);
    }
  }
  &__button {
    margin: 0px;
    position: absolute;
    bottom: 20%;
    width: 300px;
    transform: translateX(-50%);
    @media (max-width: 992px) {
      transform: translate(-50%, 50%);
      bottom: 100%;
      left: 50%;
    }
  }
}
</style>
