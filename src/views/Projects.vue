<template>
  <section class="container-fluid">
    <Header></Header>
      <Navigation></Navigation>
      <main class="col-lg-10 offset-lg-2">
        <h1>Projects</h1>
        <div class="project" v-for="project in projects" :key="project._id">
          <ProjectThumbnail :project="project"></ProjectThumbnail>
        </div>
      </main>
    </section>
</template>

<script>
import Navigation from '../components/Navigation.vue'
import ProjectThumbnail from '../components/ProjectThumbnail'
import Header from '../components/Header'
export default {
  data: () => {
    return {
      pageId: 0,
      projects: []
    }
  },
  methods: {
    fetchProjects () {
      this.$http.get(this.$httpRoutes.GET_PROJECTS, { pageId: this.pageId }).then(({data: { data }}) => {
        this.projects = this.projects.concat(data || [])
        this.pageId = this.pageId++
      })
    }
  },
  mounted () {
    this.fetchProjects()
  },
  components: { Navigation, ProjectThumbnail, Header }
}
</script>

<style lang="scss" scoped>
main {
  .project{
    display: grid;
    grid-column: repeat(auto-fit, 300px) 
  } 
}
</style>
