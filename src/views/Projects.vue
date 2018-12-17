<template>
  <section class="container-split">
    <Navigation></Navigation>
    <main class="right-view">
      <div class="project" v-for="project in projects" :key="project._id">
        <ProjectThumbnail :project="project"></ProjectThumbnail>
      </div>
    </main>
  </section>
</template>

<script>
import Navigation from '../components/Navigation.vue'
import ProjectThumbnail from '../components/ProjectThumbnail'
export default {
  data: () => {
    return {
      pageId: 0
    }
  },
  computed: {
    projects () {
      return this.$store.getters['projects/getProjects']
    }
  },
  methods: {
    fetchProjects () {
      this.$http.get(this.$httpRoutes.GET_PROJECTS, { pageId: this.pageId }).then(({data: { data }}) => {
        this.$store.dispatch('projects/setProjects', data)
      })
    }
  },
  mounted () {
    this.fetchProjects()
  },
  components: { Navigation, ProjectThumbnail }
}
</script>

<style lang="scss" scoped>
main {
  .project{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 400px));
  }
}
</style>
