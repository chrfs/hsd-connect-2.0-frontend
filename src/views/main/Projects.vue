<template>
  <section class="container-fluid">
    <Navigation></Navigation>
    <main class="right-side">
      <h1>Projects</h1>
      <div class="row">
        <ProjectThumbnail class="col-4"></ProjectThumbnail>
        <ProjectThumbnail class="col-4"></ProjectThumbnail>
        <ProjectThumbnail class="col-4"></ProjectThumbnail>
        <ProjectThumbnail class="col-4"></ProjectThumbnail>
        <ProjectThumbnail class="col-4"></ProjectThumbnail>
      </div>
    </main>
  </section>
</template>

<script>
import Navigation from '../../components/partial/Navigation.vue'
import ProjectThumbnail from '../../components/partial/ProjectThumbnail'
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
