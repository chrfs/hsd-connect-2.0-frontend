<template>
    <div id="about-background" class="about min-height-100vh">
      <h4>Was ist HSD Connect?</h4>
      <p>Wer kennt es nicht, es steht mal wieder die nächste Projektarbeit an. Kaum ist eine Aufgabe gestellt und das Team gefunden,
         fangen meist die Köpfe an zu rauchen und ratlose Blicke schweifen durch die Runde. Wie schön es doch wäre, hätte man plötzlich den
         so notwendigen Geistesblitz, einen neuen Blickwinkel auf das Problem oder eben einfach nur die passende Idee.</p>
      <p>Genau dabei hilft dir ab nun HSDConnect! Hier kannst du andere Studierende um Rat fragen, neue Perspektiven auf dein Projekt bekommen
         und Erfahrungen mit Studierenden, die du vielleicht noch gar nicht kennst, austauschen!</p>
      <p>Fachbereichsübergreifend kannst du hier an deinen Projekten arbeiten und mit Studierenden der HSD zusammenarbeiten!</p>
      <div >
        <button id="lets-connect__button" @click="changeComponent">Let's connect</button>
    </div>
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

.about {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #f2f2f2;
    position: relative;
    height: 100%;
    width: 100%;
    h4,p{
      width:300px;
      margin-top: 25px;
      color:white;
      font-size: 0.9em;
      }
    button{
      width:300px;
    }
    &#about-background{
      background: $blueGradient;
      min-height: 300px;
      @media (max-width: 991px){
        transform: translateX(0px);
      }
    }
}
</style>
