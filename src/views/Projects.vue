<template>
  <section class="container-split">
    <Navigation></Navigation>
    <main class="right-view">
      <h2>Projects</h2>
      <div class="projects">
        <div class="project" v-for="project in projects" :key="project._id">
          <ProjectThumbnail :project="project"></ProjectThumbnail>
        </div>
        <Error v-if="!projects.length">
          <template slot="message">
            <p>We would not find any project.</p>
          </template>
        </Error>
      </div>
    </main>
  </section>
</template>

<script>
import Navigation from '../components/Navigation.vue'
import ProjectThumbnail from '../components/ProjectThumbnail'
import Error from '../components/Error'
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
  components: { Navigation, ProjectThumbnail, Error }
}
</script>

<style lang="scss" scoped>
main {
  .projects{
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 400px));
    cursor: pointer;
  }
}
</style>
