<template>
    <div class="welcome__right__background">
        <div class="welcome__right__content">
        <h4>Was ist HSD Connect?</h4>
        <p>Wer kennt es nicht, es steht mal wieder die nächste Projektarbeit an. Kaum ist eine Aufgabe gestellt und das Team gefunden,
          fangen meist die Köpfe an zu rauchen und ratlose Blicke schweifen durch die Runde. Wie schön es doch wäre, hätte man plötzlich den
          so notwendigen Geistesblitz, einen neuen Blickwinkel auf das Problem oder eben einfach nur die passende Idee.</p>
        <!-- <p>Genau dabei hilft dir ab nun HSDConnect! Hier kannst du andere Studierende um Rat fragen, neue Perspektiven auf dein Projekt bekommen
          und Erfahrungen mit Studierenden, die du vielleicht noch gar nicht kennst, austauschen!</p>
        <p>Fachbereichsübergreifend kannst du hier an deinen Projekten arbeiten und mit Studierenden der HSD zusammenarbeiten!</p> -->
          <button id="lets-connect__button" @click="changeComponent">Let's connect</button>
      </div>
    </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  data: () => {
    return {}
  },
  methods: {
    changeComponent () {
      this.$router.push('/welcome/signin')
    }
  }
})
</script>

<style lang="scss">
</style>
