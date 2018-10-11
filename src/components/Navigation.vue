<template>
  <section class="side-panel">
    <ul class="side-panel_main-list">
      <router-link to="/" tag="li" exact>Projekte</router-link>
      <router-link :to="'/user/'+userId" tag="li" exact>Profil</router-link>
      <router-link to="/user/:id/messages" tag="li" exact>Nachrichten</router-link>
      <router-link to="/user/:id/projects" tag="li" exact>Eigene Projekte</router-link>
      <router-link to="/user/:id/bookmarks" tag="li" exact>Merkliste</router-link>
    </ul>
    <button>Projekt anlegen</button>
    <ul class="side-panel_sub-list">
      <router-link to="/about" tag="li" exact>Über HSDConnect</router-link>
      <router-link to="/toolbox" tag="li" exact>Toolbox</router-link>
    </ul>
    <div class="side-panel_footer">
      <p>Hochschule Düsseldorf &#9400; 2018<br>
        <router-link to="/imprint" exact>Impressum</router-link> |
        <router-link to="/privacy" exact>Datenschutz</router-link> |
        <router-link to="/contact" exact>Kontakt</router-link>
      </p>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    userId () {
      return this.$store.getters.user.id
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';
.side-panel {
  position: fixed;
  left: 0px;
  top: 10vh;
  overflow: hidden;
  height: 90vh;
  min-height: 500px;
  width: 20vw;
  min-width: 250px;
  background-image: $blueGradient;
  font-size: 0.9em;
  display: flex;
  flex-direction: column;
  .side-panel_main-list, .side-panel_sub-list {
    margin: 25px auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    li {
      padding-left: 48px;
      border-left: 2px solid transparent;
      line-height: 2.4em;
      text-transform: uppercase;
      color: white;
      &:hover {
        transition: all .4s ease-in-out;
        cursor: pointer;
        border-left: 2px solid $baseRed;
        background-color: #3e4159;
      }
    }
    .active-link {
      border-left: 2px solid $baseRed;
      background-color: #3e4159;
      box-shadow: 0px -2px 5px rgba(19, 25, 29, 0.4),
                  0px 2px 5px rgba(19, 25, 54, 0.4);
    }
  }
  .side-panel_sub-list{
    border-top: 1px solid #313e5a;
    border-bottom: 1px solid #313e5a;
    margin-top: auto;
    padding-top: 20px;
    padding-bottom: 20px;
    li {
      bottom: 0px;
    }
  }
  button {
    width: 100%;
    margin-bottom: 25vh;
    margin-top: 0;
    box-shadow: 0px -2px 32px rgba(19, 25, 54, 0.6),
                0px 2px 32px rgba(19, 25, 54, 0.6);
  }
  .side-panel_footer {
    font-size: 0.6em;
    text-align: left;
    padding-bottom: 10px;
    margin-left: 50px;
    p, a {
      color: #848484;
      line-height: 2em;
    }
  }
}
</style>
