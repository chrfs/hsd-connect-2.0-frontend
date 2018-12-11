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
      pageId: 0,
      projects: [
        {
          title: 'Build a new platform',
          description: 'This is a new project and proof of concept',
          searching_participants: true,
          status: 'getting started',
          participants: [],
          liked_by: [],
          created_at: Date.now(),
          updated_at: Date.now()
        }
      ]
    }
  },
  methods: {
    fetchProjects () {
      this.$http.get(this.$httpRoutes.GET_PROJECTS, { pageId: this.pageId }).then(({data: { data }}) => {
        this.projects = this.projects.concat(data || [])
        this.pageId = this.pageId++
      })
    }
  },
  mounted () {
    // this.fetchProjects()
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
