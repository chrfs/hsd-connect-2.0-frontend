<template>
  <section class="container-fluid">
    <Header></Header>
      <Navigation></Navigation>
      <main class="col-lg-10 offset-lg-2">
        <h1>Projects</h1>
        <div class="row">
          <ProjectThumbnail></ProjectThumbnail>
        </div>
      </main>
    </section>
</template>

<script>
import Navigation from '../components/Navigation.vue'
import ProjectThumbnail from '../components/ProjectThumbnail'
import Header from '../components/Header'
export default {
  components: { Navigation, ProjectThumbnail, Header }
}
</script>

<style lang="scss" scoped>
main {
  position: relative;
  top: 80px;
}
</style>
