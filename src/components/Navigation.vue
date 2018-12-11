<template>
<<<<<<< HEAD
  <section class="side-panel col-md-2 d-none d-lg-block">
    <ul class="side-panel_main-list">
      <router-link to="/" tag="li" exact>Projekte</router-link>
      <router-link :to="'/user/'+userId" tag="li" exact>Profil</router-link>
      <router-link to="/user/:id/messages" tag="li" exact>Nachrichten</router-link>
      <router-link to="/user/:id/projects" tag="li" exact>Eigene Projekte</router-link>
      <router-link to="/user/:id/bookmarks" tag="li" exact>Merkliste</router-link>
    </ul>
    <button>Projekt anlegen</button>
=======
  <section class="side-panel left-view">
    <div class="side-panel_logo">
      <img class="side-panel_logo_img" src="../assets/img/logo.png" alt="HSD Logo">
    </div>
    <ul class="side-panel_main-list">
      <router-link to="/" tag="li" exact><font-awesome-icon class="fa-icon" icon="th"></font-awesome-icon>Projekte</router-link>
      <router-link :to="'/user/'+userId" tag="li" exact><font-awesome-icon class="fa-icon" icon="user"></font-awesome-icon>Profil</router-link>
      <router-link :to="'/user/' + userId + '/messages'" tag="li" exact><font-awesome-icon class="fa-icon" icon="envelope"></font-awesome-icon>Nachrichten</router-link>
      <router-link :to="'/user/' + userId + '/projects'" tag="li" exact><font-awesome-icon class="fa-icon" icon="file-alt"></font-awesome-icon>Eigene Projekte</router-link>
      <router-link :to="'/user/' + userId + '/bookmarks'" tag="li" exact><font-awesome-icon class="fa-icon" icon="bookmark"></font-awesome-icon>Merkliste</router-link>
    </ul>
    <button class="side-panel_new-project"><font-awesome-icon class="fa-icon" icon="plus-square"></font-awesome-icon>Projekt anlegen</button>

>>>>>>> develop
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
<<<<<<< HEAD
  position: fixed;
  left: 0px;
  top: $headerHeight;
  height: calc(100vh - #{$headerHeight});
=======
  height: 100vh;
  overflow-y: auto;
>>>>>>> develop
  min-height: 500px;
  background-image: $blueGradient;
  font-size: 0.9em;
  display: flex;
  flex-direction: column;
<<<<<<< HEAD
  .side-panel_main-list, .side-panel_sub-list {
    margin: 25px auto;
=======
  .fa-icon {
    margin-left: 0px;
  }
  .side-panel_logo {
    padding: 25px 0px 25px 48px;
    max-height: 300px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .side-panel_logo_img {
      width: 200px;
    }
  }
  .side-panel_main-list, .side-panel_sub-list {
    margin: 0 auto 25px;
>>>>>>> develop
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
<<<<<<< HEAD
      box-shadow: 0px -2px 5px rgba(19, 25, 29, 0.4),
                  0px 2px 5px rgba(19, 25, 54, 0.4);
=======
>>>>>>> develop
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
<<<<<<< HEAD
  button {
    width: 100%;
    margin-bottom: 25vh;
    margin-top: 0;
    box-shadow: 0px -2px 32px rgba(19, 25, 54, 0.6),
                0px 2px 32px rgba(19, 25, 54, 0.6);
=======
  button.side-panel_new-project {
    width: 100%;
    margin-bottom: 25vh;
    margin-top: 0;
    text-align: left;
    padding-left: 50px;
    box-shadow: 0px -2px 20px rgba(125, 135, 185, 0.6),
                0px 2px 20px rgba(19, 25, 54, 0.6);
>>>>>>> develop
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
