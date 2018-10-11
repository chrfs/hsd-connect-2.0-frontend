<template>
  <section class="container-fluid">
    <Header></Header>
    <Navigation></Navigation>
    <main class="right-side">
      <div class="row">
        <img class="project_image"/>
        <div class="project_status">
            <p>In Arbeit</p>
        </div>
      </div>
      <div class="row">
        <div class="col-8 project_main-box">
          <div class="row project_description">
            <h5>Was wir machen</h5>
            <p></p>
            <h5>Unsere nächsten Schritte</h5>
            <p></p>
            <h5>Was du machen kannst</h5>
            <p></p>
          </div>
          <div class="row project_comments"></div>
        </div>
        <div class="col-4 project_side-box">
          <div class="row project_team"></div>
          <div class="row project_media"></div>
          <div class="row project_keywords"></div>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import Navigation from '../components/Navigation.vue'
import Header from '../components/Header'
export default {
  components: { Navigation, ProjectThumbnail, Header }
}
</script>

<style lang="scss" scoped>
.right-side {
  position: absolute;
  top: 10vh;
  left: 25vw;
  width: 70vw;
}
</style>
