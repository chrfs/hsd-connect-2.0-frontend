<template>
<<<<<<< HEAD
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
=======
  <section class="container-split">
    <Navigation></Navigation>
    <main class="right-view">
      <div class="project" v-for="project in projects" :key="project._id">
        <ProjectThumbnail :project="project"></ProjectThumbnail>
      </div>
    </main>
  </section>
>>>>>>> develop
</template>

<script>
import Navigation from '../components/Navigation.vue'
import ProjectThumbnail from '../components/ProjectThumbnail'
<<<<<<< HEAD
import Header from '../components/Header'
=======

>>>>>>> develop
export default {
  data: () => {
    return {
      pageId: 0,
<<<<<<< HEAD
      projects: []
=======
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
>>>>>>> develop
    }
  },
  methods: {
    fetchProjects () {
      this.$http.get(this.$httpRoutes.GET_PROJECTS, { pageId: this.pageId }).then(({data: { data }}) => {
<<<<<<< HEAD
        this.projects = this.projects.concat(data || [])
=======
        this.projects = this.projects.concat(data || [])
>>>>>>> develop
        this.pageId = this.pageId++
      })
    }
  },
  mounted () {
<<<<<<< HEAD
    this.fetchProjects()
  },
  components: { Navigation, ProjectThumbnail, Header }
=======
    // this.fetchProjects()
  },
  components: { Navigation, ProjectThumbnail }
>>>>>>> develop
}
</script>

<style lang="scss" scoped>
main {
  .project{
    display: grid;
<<<<<<< HEAD
    grid-column: repeat(auto-fit, 300px) 
  } 
=======
    grid-template-columns: repeat(auto-fill, minmax(300px, 400px));
  }
>>>>>>> develop
}
</style>
