<template>
  <div class="welcome__background">
    <div class="welcome__content">
      <h4>Was ist HSD Connect?</h4>
      <p>
        Wer kennt es nicht, es steht mal wieder die nächste Projektarbeit an. Kaum ist eine Aufgabe
        gestellt und das Team gefunden, fangen meist die Köpfe an zu rauchen und ratlose Blicke
        schweifen durch die Runde. Wie schön es doch wäre, hätte man plötzlich den so notwendigen
        Geistesblitz, einen neuen Blickwinkel auf das Problem oder eben einfach nur die passende
        Idee.
      </p>
      <button class="button" @click="changeComponent('/welcome/signup')">Let's connect</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data: () => ({}),
  methods: {
    changeComponent(path: string) {
      this.$router.push(path);
    }
  }
});
</script>

<style lang="scss"></style>
