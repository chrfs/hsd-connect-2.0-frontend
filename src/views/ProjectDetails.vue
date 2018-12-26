<template>
  <section class="container-split">
    <Navigation></Navigation>
    <main class="right-view">
      <Error v-if="notFound">
          <template slot="message">
            <p>We could not find the project you are looking for.</p>
          </template>
          <template slot="action">
            <button @click="$router.push('/')">Go Back</button>
          </template>
      </Error>
      <section v-if="project" class="project">
        <header class="project__header" :style="{'background-image': 'url(' + getProjectHeaderImageURL + ')'}">
          <div class="project__status">
            <p>{{$moment(project.createdAt).format('L')}}</p>
          </div>
          <h3>{{project.title}}</h3>
        </header>
        <div class="project__description box-shadowed">
          <h3>Description:</h3>
          <p>{{project.description}}</p>
          <div class="project__meta">
            <span class="project__meta__likes"><font-awesome-icon class="fa-icon" :icon="['far', 'heart']"></font-awesome-icon>{{project.likedBy ? project.likedBy.length : 0}}</span>
            <span class="project__meta__comments"><font-awesome-icon class="fa-icon" :icon="['far', 'comment']"></font-awesome-icon>{{project.feedback && project.feedback.comment ? project.likes.length : 0}}</span>
            <span class="project__meta__bookmark"><font-awesome-icon class="fa-icon" @click="bookmarkProject" :icon="isBookmarkedProject ? ['fas', 'bookmark'] : ['far', 'bookmark']"></font-awesome-icon></span>
          </div>
        </div>
        <div class="project__infos">
          <div class="project__info margin-bottom box-shadowed">
            <h4 class="project__info__header">Team</h4>
            <div class="project__info__content">
              <div class="project__member">
                <img class="border-round" :src="getProjectOwnerImageURL" alt="Project Owner Image">
                <p>{{project.user.firstname}} {{project.user.lastname}}</p>
              </div>
            </div>
            <div class="project__info__content" v-if="project.members.length">
              <div class="project__member" v-for="member in project.members" :key="member._id">
                <img class="border-round" :src="getUserImageURL(member.image)" alt="Project Owner Image">
                <p>{{project.user.firstname}} {{project.user.lastname}}</p>
              </div>
            </div>
            <button v-if="project.searchingParticipants" class="project__member__join">JOIN THE TEAM</button>
          </div>
          <div class="project__info box-shadowed">
            <h4 class="project__info__header">Media</h4>
            <div class="project__info__content" v-if="project.images.length">
              <div class="project__image" v-for="image in project.images" :key="image._id">
                <img :src="getProjectImageURL(image.token)" alt="Project Image">
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </section>
</template>

<script>
import Navigation from '../components/Navigation.vue'
import Error from '../components/Error'
export default {
  data: () => {
    return {
      notFound: false
    }
  },
  watch: {
    projectId () {
      this.fetchProject()
    }
  },
  computed: {
    projectId () {
      return this.$route.params.id
    },
    project () {
      const project = this.$store.getters['projects/getProject']
      if (project._id !== this.projectId) return null
      return project
    },
    isBookmarkedProject () {
      return this.$store.getters['user/getUser'].bookmarkedProjects.includes(this.project._id)
    },
    getProjectHeaderImageURL () {
      const projectImages = this.project ? this.project.images : []
      const imageToken = projectImages.length ? projectImages[0].token : null
      return this.getProjectImageURL(imageToken)
    },
    getProjectOwnerImageURL () {
      const imageToken = this.project && this.project.user.image ? this.project.user.image.token : null
      return this.getUserImageURL(imageToken)
    }
  },
  methods: {
    getProjectImageURL (imageToken) {
      return imageToken ? `${this.$APIHost}/projects/${this.projectId}/images/${imageToken}` : 'https://via.placeholder.com/800x200'
    },
    getUserImageURL (imageToken) {
      return imageToken ? `${this.$APIHost}/user/${this.project.user._id}/images/${imageToken}` : 'https://via.placeholder.com/50x50'
    },
    fetchProject () {
      this.notFound = false
      this.$http.get('/projects/' + this.projectId, { pageId: this.pageId }).then(({data: { data }}) => {
        this.$store.dispatch('projects/setProject', data)
      }).catch((res) => {
        this.notFound = true
      })
    },
    bookmarkProject () {
      this.$store.dispatch('user/bookmarkProject', this.project._id)
    }
  },
  mounted () {
    this.fetchProject()
  },
  components: { Navigation, Error }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';
.project {
    display: grid;
    grid-template-areas: "header header" "description info";
    grid-template-columns: 70% 30%;
    grid-template-rows: 300px auto;
    grid-gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
  .project__header {
    position: relative;
    grid-area: header;
    background-position: center center;
    background-size: cover;
    height: 300px;
    width: 100%;
    display: flex;
    h3 {
      color: white;
      font-family: "Montserrat-Regular";
      padding: 8px 12px;
      margin-top: auto;
      background: $baseBlue;
    }
    .project__status {
      position: absolute;
      top: 25px;
      background-color: $baseBlue;
      border-right: 2px solid $fbBlue;
      right: 0;
      p {
        font-size: 0.8em;
        text-transform: uppercase;
        font-family: 'Montserrat-Light';
        margin-right: 20px;
        margin-left: 10px;
        text-align: right;
        color: white;
        padding: 5px;
      }
    }
  }
  .project__description {
    grid-area: description;
    flex-direction: column;
    padding: 30px 40px;
    align-self: flex-start;
    background: white;
    h3 {
      font-size: 15px;
      margin: 0;
      padding-bottom: 10px;
      font-family: "Montserrat-Regular"
    }
    p {
      font-size: 0.9em;
      white-space: pre-wrap;
    }
    .project__meta {
      display: flex;
      justify-content: flex-end;
      .project__meta__bookmark {
        cursor: pointer;
      }
    }
  }
  .project__infos {
    .project__info {
      grid-area: info;
      align-self: flex-start;
      background: white;
      width: 100%;
      .project__info__header {
        border-bottom: 1px solid $baseLightGrey;
        padding: 30px 40px 10px;
        margin: 0px;
      }
      .project__info__content {
        padding: 10px 40px;
        display: flex;
        .project__image {
          overflow: hidden;
          width: 100px;
          height: 40px;
          overflow: hidden;
          margin-right: 10px;
          img {
            width: 100px;
            min-height: 40px;
          }
        }
      }
      .project__member__join {
        width: 100%;
        background: $baseLightGrey;
        color: $baseBlue;
        font-family: "Montserrat-Regular";
        letter-spacing: 0px;
      }
    }
  }
}
</style>
