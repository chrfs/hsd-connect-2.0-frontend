<template>
    <div id="lets-connect__symbol-background" class="lets-connect min-height-100vh">
        <button id="lets-connect__button" @click="changeComponent">Let's connect</button>
    </div>
</template>

<script>
export default {
  data: () => {
    return {
      nextComponent: 'WelcomeLogin'
    }
  },
  methods: {
    changeComponent () {
      console.log('changed', this.nextComponent)
      this.$emit('changeComponent', this.nextComponent)
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
    &#lets-connect__symbol-background{
     // background-image: url('../../assets/img/welcome/symbol_connect.svg');
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
    transform: translateX(-50%);
    @media (max-width: 991px){
        bottom: 100%;
        left: 50%;
        transform: translate(-50%, 50%);
    }
  }
}
</style>
