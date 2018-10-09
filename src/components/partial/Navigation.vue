<template>
  <section>
    <div class="side-panel">
      <ul class="side-panel-main-list">
        <router-link to="/Projects" tag="li" exact>Projekte</router-link>
        <router-link to="/Profil" tag="li" exact>Profil</router-link>
        <router-link to="/Messages" tag="li" exact>Nachrichten</router-link>
        <router-link to="/Projects" tag="li" exact>Eigene Projekte</router-link>
        <router-link to="/Bookmark" tag="li" exact>Merkliste</router-link>
      </ul>
      <span class="line"></span>
      <button>Projekt anlegen</button>
      <ul class="side-panel-sub-list">
        <router-link to="/About" tag="li" exact>Über HSDConnect</router-link>
        <router-link to="/Toolbox" tag="li" exact>Toolbox</router-link>
      </ul>
      <span class="line"></span>
      <div class="footer">
        <p>Hochschule Düsseldorf &#9400; 2018<br>
        <router-link to="/Inprint" exact>Impressum</router-link> |
        <router-link to="/Privacy" exact>Datenschutz</router-link> |
        <router-link to="/Contact" exact>Kontakt</router-link>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';
.side-panel {
  position:fixed;
  left: 0px;
  top: 0px;
  overflow:hidden;
  height: 100vh;
  min-height: 500px;
  width:20vw;
  min-width: 250px;
  background-image: $blueGradient;
  padding-top:10vh;
  font-size: 0.9em;
  .side-panel-main-list, .side-panel-sub-list {
    padding-top:5vh;
    padding-bottom:5vh;
    li{
      margin-left: 50px;
      line-height: 2.4em;
      text-transform: uppercase;
      color:white;
      &:hover {
        margin-left:0px;
        cursor: pointer;
        border-left: 2px solid red;
        background-color:#3e4159;
        box-shadow: 0px -2px 5px rgba(19, 25, 29, 0.4),
                    0px 2px 5px rgba(19, 25, 54, 0.4);
      }
    }
    .active-link {
      border-left: 2px solid red;
      background-color:#3e4159;
      box-shadow: 0px -2px 5px rgba(19, 25, 29, 0.4),
                  0px 2px 5px rgba(19, 25, 54, 0.4);
    }
  }
  .side-panel-sub-list{
    border-top: 1px solid #313e5a;
    border-bottom: 1px solid #313e5a;
    position:flex;
    li{
      bottom: 0px;
    }
  }
  button{
    width: 100%;
    margin-bottom:25  vh;
    margin-top:0;
    box-shadow: 0px -2px 32px rgba(19, 25, 54, 0.6),
                0px 2px 32px rgba(19, 25, 54, 0.6);
  }
  .footer{
    padding-top:5vh;
    font-size: 0.6em;
    text-align: center;
    p, a {
        color:#848484;
         line-height: 2em;
    }
  }
}
</style>
