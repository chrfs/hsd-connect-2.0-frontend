<template>
  <section class="container-split">
    <Navigation></Navigation>
    <main class="right-view">
      <div class="project_header">
        <img class="project_image" src="../assets/img/project_header_image.jpg"/>
        <div class="project_status">
            <p>In Arbeit</p>
        </div>
        <div class="project_header_text">
          <h5 class="project_info">10.10.2018</h5>
          <h1 class="project_title">Der Titel des Projektes ist in einer Zeilen</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-8 project_main-box box-shadowed">
          <div class="row project_description">
            <h5>Was wir machen</h5>
            <p> Lorem Ipsum</p>
            <h5>Unsere nächsten Schritte</h5>
            <p></p>
            <h5>Was du machen kannst</h5>
            <p></p>
          </div>
          <div class="row project_comments"></div>
        </div>
        <div class="col-4 project_side-box">
          <div class="row project_team box-shadowed">
            <h4 class="col-12">Team</h4>
            <div class="col-12 project_team_owner">
              <img class="col-2" id="profile_image" src="../assets/img/profile_image.jpg">
              <p class="col-8 project_team_owner_infos">Katharina Baumgartner <br>
                Fachbereich Medien <br>
                B. Sc. Medieninformatik <br>
                7. Semester </p>
            </div>
            <div class="row project_team_mates"></div>
            <button>Join the team</button>
          </div>
          <div class="row project_media box-shadowed"></div>
          <div class="row project_keywords box-shadowed"></div>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import Navigation from '../components/Navigation.vue'
export default {
  components: { Navigation }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';

.right-side {
  position: absolute;
  top: 10vh;
  left: 25vw;
  width: 70vw;
  .project_header {
    height:40vh;
    width:100%;
    background-image: linear-gradient(to top, #131936bf 0%, transparent 100%);
    margin-bottom: 25px;
    .project_image {
      width: 100%;
      height: auto;
      position: relative;
      z-index: -1;
    }
    .project_status {
        position: absolute;
        top: 25px;
        background-color: $baseBlue;
        border-right: 2px solid $fbBlue;
        right: 0;
        p {
          font-size: 0.8em;
          text-transform: uppercase;
          font-family: 'Montserrat-Light';
          margin-right: 20px;
          margin-left: 10px;
          text-align: right;
          color: white;
          padding: 5px;
        }
    }
    .project_header_text {
      position: absolute;
      bottom: 0px;
      padding-left:25px;
      padding-bottom: 40px;
      .project_title {
      font-size: 1.5em;
      color: white;
      }
      .project_info {
        color: white;
      }
    }
  }
  .project_main-box {
    width: 100%;
    height: 500px;
    padding:10px;
  }
  .project_side-box{
    padding-left: 30px;
    p {
      font-size: 0.8em;
    }
    .project_team{
      .projcet_team_owner{
        width:100%;
      }
      button{
        background-color:$baseLightGrey;
        width: 100%;
      }
      #profile_image {
        right: 0;
        bottom: 0;
        width: 40px;
        height: 40px;
        border-radius: 50px;
      }
    }
  }
}
</style>
