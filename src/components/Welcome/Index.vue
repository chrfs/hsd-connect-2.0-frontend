<template>
    <div id="lets-connect-symbol-background" class="lets-connect">
        <button id="lets-connect-button" @click="changeComponent">Let's connect</button>
    </div>
</template>

<script>
export default {
  data: () => {
    return {}
  },
  methods: {
    changeComponent () {
      this.$router.push('/welcome/signin')
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/variables';

.lets-connect {
    background-image: url('../../assets/img/welcome/symbol_connect_white.svg'),$blueGradient;
    height: 100%;
    width: 100%;
    position: relative;
    &#lets-connect-symbol-background {
      background-size: cover;
      position: relative;
      min-height: 300px;
      @media (max-width: 991px){
        transform: translateX(0px);
      }
    }

  #lets-connect-button{
    position: absolute;
    bottom: 20%;
    transform: translateX(-50%);
    @media(max-width: 992px) {
      transform: translate(-50%, 75%);
      z-index: 2;
      bottom: 100%;
      left: 50%;
    }
  }
}
</style>
