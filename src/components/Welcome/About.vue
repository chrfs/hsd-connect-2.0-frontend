<template>
    <div class="welcome-right-background">
      <h4>Was ist HSD Connect?</h4>
      <p>Wer kennt es nicht, es steht mal wieder die nächste Projektarbeit an. Kaum ist eine Aufgabe gestellt und das Team gefunden,
         fangen meist die Köpfe an zu rauchen und ratlose Blicke schweifen durch die Runde. Wie schön es doch wäre, hätte man plötzlich den
         so notwendigen Geistesblitz, einen neuen Blickwinkel auf das Problem oder eben einfach nur die passende Idee.</p>
      <!-- <p>Genau dabei hilft dir ab nun HSDConnect! Hier kannst du andere Studierende um Rat fragen, neue Perspektiven auf dein Projekt bekommen
         und Erfahrungen mit Studierenden, die du vielleicht noch gar nicht kennst, austauschen!</p>
      <p>Fachbereichsübergreifend kannst du hier an deinen Projekten arbeiten und mit Studierenden der HSD zusammenarbeiten!</p> -->
      <div >
        <button id="lets-connect-button" @click="changeComponent">Let's connect</button>
    </div>
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
    .welcome-right-background {
      background: $blueGradient;
      flex-direction: column;
      min-height: 300px;
      @media (max-width: 991px){
        transform: translateX(0px);
      }
      h4, p {
        width: 300px;
        color: white;
      }
      button {
        width: 300px;
      }
    }
</style>
