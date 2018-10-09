<template>
  <section class="container-fluid">
    <Navigation></Navigation>
    <main class="right-side">
      <h1>Projects</h1>
      <div class="row">
        <ProjectThumbnail></ProjectThumbnail>
        <ProjectThumbnail></ProjectThumbnail>
        <ProjectThumbnail></ProjectThumbnail>
        <ProjectThumbnail></ProjectThumbnail>
        <ProjectThumbnail></ProjectThumbnail>
      </div>
    </main>
  </section>
</template>

<script>
import Navigation from '../components/Navigation.vue'
import ProjectThumbnail from '../components/ProjectThumbnail'
export default {
  components: { Navigation, ProjectThumbnail }
}
</script>

<style lang="scss" scoped>
.right-side {
  position: absolute;
  top: 0px;
  left: 25vw;
  width: 70vw;
}
</style>
