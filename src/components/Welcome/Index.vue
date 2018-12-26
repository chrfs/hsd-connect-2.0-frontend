<template>
    <div id="lets-connect__symbol__background" class="lets-connect">
        <button id="lets-connect__button" @click="changeComponent">Let's connect</button>
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
    &#lets-connect__symbol__background {
      background-size: cover;
      position: relative;
      min-height: 300px;
      @media (max-width: 991px){
        transform: translateX(0px);
      }
    }

  #lets-connect__button{
    position: absolute;
    bottom: 20%;
    width: 300px;
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
