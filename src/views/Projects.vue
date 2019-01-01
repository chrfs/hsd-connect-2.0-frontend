<template>
  <section class="container-split">
    <Navigation></Navigation>
    <main class="right-view">
      <h2>{{$t("general.welcome")}}</h2>
       <Error v-if="!projects.length">
          <template slot="message">
            <p>We could not find any project.</p>
          </template>
      </Error>
      <div class="projects">
        <div class="project" v-for="project in projects" :key="project._id">
          <ProjectThumbnail :project="project"></ProjectThumbnail>
        </div>
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
      this.$http.get('/projects', { pageId: this.pageId }).then(({data: { data }}) => {
        this.$store.dispatch('projects/setProjects', data)
      }).catch((res) => {
        const response = res.response
        if (!response || !response.data || response.data.status >= 500) {
          // TODO: SET NOTIFICATION
          // this.fields.notification.message = 'An unexpected error has occurred.'
          this.$store.dispatch('user/setAuthToken', null)
          return
        }
        const data = response.data
        if (!data.errors) return
        Object.keys(data.errors).forEach(entry => {
          this.fields[entry].message = data.errors[entry]
        })
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
