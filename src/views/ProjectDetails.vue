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
            <div class="project__meta__info">
              <span class="project__meta__likes">{{project.likedBy ? project.likedBy.length : 0}} Likes</span>
              <span class="project__meta__comments">{{project.feedback ? project.feedback.length : 0}} Comments</span>
            </div>
            <div class="project__meta__buttons">
              <span class="project__meta__likes"><font-awesome-icon @click="likeProject" class="fa-icon"  :icon="isLikedProject ? ['fas', 'heart'] : ['far', 'heart']"></font-awesome-icon></span>
              <span class="project__meta__feedback"><font-awesome-icon @click="newFeedback.show = !newFeedback.show" class="fa-icon"  :icon="newFeedback.show ? ['fas', 'comment'] : ['far', 'comment']"></font-awesome-icon></span>
              <span class="project__meta__bookmark"><font-awesome-icon @click="bookmarkProject" class="fa-icon" :icon="isBookmarkedProject ? ['fas', 'bookmark'] : ['far', 'bookmark']"></font-awesome-icon></span>
          </div>
          </div>
        </div>
        <div class="project__info__fields">
          <div class="project__info margin-bottom box-shadowed">
            <h4 class="project__info__header">Team</h4>
            <div class="project__info__content">
              <div class="project__member">
                <div class="image-container">
                  <img class="border-round" :src="getProjectOwnerImageURL" alt="Project Owner Image">
                </div>
                <p>{{project.user.firstname}} {{project.user.lastname}}</p>
              </div>
            </div>
            <div class="project__info__content" v-if="project.members.length">
              <div class="project__member" v-for="member in project.members" :key="member._id">
                <div class="image-container">
                  <img class="border-round" :src="getUserImageURL(member.image)" alt="Project Owner Image">
                </div>
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
        <div v-show="newFeedback.show" class="project__feedback__create box-shadowed">
          <div class="project__feedback__create__sub">
            <h4>Post Feedback</h4>
            <textarea spellcheck="false" v-model="newFeedback.content" placeholder="Write your thoughts.." class="project__feedback__create__textarea"></textarea>
          </div>
          <p class="text-error">{{newFeedback.message}}</p>
          <button @click="postFeedback" class="project__feedback__create__button">Send</button>
        </div>
        <div class="project__feedback__entries">
          <div class="project__feedback box-shadowed-lighter" v-for="feedback in project.feedback" :key="feedback._id">
            <div class="image-container project__feedback__author-image">
              <img class="border-round" :src="getUserImageURL(feedback.user.image.token)" alt="User Image">
            </div>
            <p class="project__feedback__author-name">{{feedback.user.firstname}} {{feedback.user.lastname}}</p>
            <p class="project__feedback__content">{{feedback.content}}</p>
            <p class="project__feedback__created-at">{{$moment(feedback.createdAt).format('L')}}</p>
            <div class="project__feedback__comments">
              <div class="project__feedback__comment" v-for="comment in feedback.comments" :key="comment._id">
                <p class="project__feedback__comment__created-at">{{$moment(comment.createdAt).format('L')}} </p>
                <p class="project__feedback__comment__author-name">{{comment.user.firstname}} {{comment.user.lastname}}</p>
                <p class="project__feedback__comment__content">{{comment.content}}</p>
              </div>
            </div>
            <div class="project__meta">
              <div class="project__meta__info">
                <span class="project__meta__likes">{{feedback.likedBy ? feedback.likedBy.length : 0}} Likes</span>
                <span class="project__meta__feedback">{{feedback.comments ? feedback.comments.length : 0}} Comments</span>
              </div>
              <div class="project__meta__buttons">
                <span class="project__meta__likes"><font-awesome-icon @click="likeProjectFeedback(feedback._id)" class="fa-icon" :icon="isLikedProjectFeedback(feedback._id) ? ['fas', 'heart'] : ['far', 'heart']"></font-awesome-icon></span>
                <span class="project__meta__feedback"><font-awesome-icon @click="feedbackComments[feedback._id].show = !feedbackComments[feedback._id].show" class="fa-icon" :icon="feedbackComments[feedback._id].show ? ['fas', 'comment'] : ['far', 'comment']"></font-awesome-icon></span>
              </div>
            </div>
            <div class="project__feedback__comment__create" v-show="feedbackComments[feedback._id].show">
              <input class="project__feedback__comment__create__input" v-model="feedbackComments[feedback._id].content" placeholder="Write your comment here...">
              <button @click="postFeedbackComment(feedback._id)" class="project__feedback__comment__create__button--send"><font-awesome-icon class="fa-icon" :icon="['fab', 'telegram-plane']"></font-awesome-icon></button>
              <p class="text-error">{{newFeedback.message}}</p>
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
      notFound: false,
      newFeedback: {
        content: '',
        message: '',
        show: false
      },
      feedbackComments: {},
      newFeedbackComment: {
        content: '',
        message: '',
        show: false
      }
    }
  },
  watch: {
    project: {
      handler () {
        if (!this.project.feedback) {
          return
        }
        console.log('called')
        this.feedbackComments = this.project.feedback.reduce((acc, {_id: feedbackId}) => {
          if (this.feedbackComments[feedbackId]) {
            acc[feedbackId] = this.feedbackComments[feedbackId]
          } else {
            acc[feedbackId] = JSON.parse(JSON.stringify(this.newFeedbackComment))
          }
          return acc
        }, {})
      },
      deep: true
    },
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
    user () {
      return this.$store.getters['user/getUser']
    },
    isBookmarkedProject () {
      return this.user.bookmarkedProjects.includes(this.project._id)
    },
    isLikedProject () {
      return this.project && this.project.likedBy.includes(this.user._id)
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
    isLikedProjectFeedback (feedbackId) {
      const feedback = this.project.feedback.find(el => el._id === feedbackId)
      return feedback && feedback.likedBy.includes(this.user._id)
    },
    getProjectImageURL (imageToken) {
      return imageToken ? `${this.$APIHost}/projects/${this.projectId}/images/${imageToken}` : 'https://via.placeholder.com/800x200'
    },
    getUserImageURL (imageToken) {
      return imageToken ? `${this.$APIHost}/user/${this.project.user._id}/images/${imageToken}` : 'https://via.placeholder.com/200x200'
    },
    fetchProject () {
      this.notFound = false
      this.$http.get('/projects/' + this.projectId, { pageId: this.pageId }).then(({data: { data }}) => {
        this.$store.dispatch('projects/setProject', data)
      }).catch((res) => {
        this.notFound = true
      })
    },
    postFeedback () {
      this.newFeedback.message = ''
      this.$http.post('/projects/' + this.project._id + '/feedback', { feedback: this.newFeedback }).then(({ data: { data } }) => {
        // TODO: SET NOTIFICATION
        this.$store.dispatch('projects/addProjectFeedbackEntry', data)
        this.newFeedback.content = ''
      }).catch((res) => {
        const response = res.response
        if (!response || !response.data || response.data.status >= 500) {
          // this.fields.notification.message = 'An unexpected error has occurred.'
          // this.$store.dispatch('user/setAuthToken', null)
          return
        }
        const data = response.data
        if (data.data) {
          // TODO: SET NOTIFICATION
        } else if (data.errors) {
          Object.keys(data.errors).forEach(entry => {
            this.newFeedback.message = data.errors.content
          })
        }
      })
    },
    postFeedbackComment (feedbackId) {
      console.log(this.feedbackComments[feedbackId])
      const feedbackComment = this.feedbackComments[feedbackId]
      feedbackComment.message = ''
      this.$http.post('/projects/' + this.project._id + '/feedback/' + feedbackId, { comment: feedbackComment }).then(({ data: { data } }) => {
        // TODO: SET NOTIFICATION
        this.$store.dispatch('projects/addProjectFeedbackEntry', data)
        feedbackComment.content = ''
      }).catch((res) => {
        const response = res.response
        if (!response || !response.data || response.data.status >= 500) {
          // this.fields.notification.message = 'An unexpected error has occurred.'
          // this.$store.dispatch('user/setAuthToken', null)
          return
        }
        const data = response.data
        if (data.data) {
          // TODO: SET NOTIFICATION
        } else if (data.errors) {
          Object.keys(data.errors).forEach(entry => {
            feedbackComment.message = data.errors.content
          })
        }
      })
    },
    bookmarkProject () {
      this.$store.dispatch('user/bookmarkProject', this.project._id)
    },
    likeProject () {
      this.$http.put('/projects/' + this.project._id + '/like').then(({ data: { data } }) => {
        this.$store.dispatch('projects/setProject', {...this.project, likedBy: data.likedBy})
      })
    },
    likeProjectFeedback (feedbackId) {
      this.$http.put('/projects/' + this.project._id + '/feedback/' + feedbackId + '/like').then(({ data: { data } }) => {
        this.$store.dispatch('projects/updateProjectFeedbackEntry', {_id: feedbackId, ...data})
      })
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
  grid-template-areas: "header header" "description info" "feedbackCreate ." "feedback .";
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
    text-align: justify;
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
  }
  .project__meta {
    grid-area: meta;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 10px;
    .project__meta__info {
      font-size: 0.8rem;
      display: flex;
      justify-content: flex-end;
      .project__meta__likes, .project__meta__comments {
        padding: 0px 10px 0px 0px;
        color: $baseGrey;
      }
    }
    .project__meta__buttons {
      .fa-icon {
        cursor: pointer;
        color: $baseRed;
      }
    }
  }
  .project__info__fields {
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
  .project__feedback__create {
    grid-area: feedbackCreate;
    background: white;
    .project__feedback__create__sub {
      padding: 0px 25px;
    }
    display: flex;
    flex-direction: column;
    background: white;
    .project__feedback__create__textarea {
      width: 100%;
      height: 100px;
    }
    .project__feedback__create__button {
      margin-top: 0px;
    }
  }
  .project__feedback__entries {
    grid-area: feedback;
    background: transparent;
    .project__feedback {
      display: grid;
      min-height: 100px;
      margin-bottom: 10px;
      border-bottom: 1px solid $baseLightGrey;
      border-top: 1px solid $baseLightGrey;
      grid-template-areas:  "authorImage authorName createdAt"
                            "authorImage content content"
                            ". comments comments"
                            "meta meta meta"
                            "writeNewComment writeNewComment writeNewComment";
      grid-template-columns: 80px 1fr;
      padding: 20px;
      justify-content: center;
      align-items: center;
      .project__feedback__author-name {
        font-family: "Montserrat-SemiBold";
        padding-bottom: 10px;
        grid-area: authorName;
      }
      .project__feedback__content {
        grid-area: content;
        margin-bottom: 25px;
      }
      .project__feedback__created-at {
        color: $baseGrey;
        font-size: 0.7rem;
        margin-right: auto;
      }
      .project__feedback__author-image {
        align-self: flex-start;
        grid-area: authorImage;
        margin: 0;
      }
    }
    .project__feedback__comments {
      grid-area: comments;
      .project__feedback__comment {
        margin-bottom: 15px;
        border-left: 1px solid $baseGrey;
        display: grid;
        grid-template-areas: "authorName createdAt" "content content";
        grid-template-columns: 1fr;
        padding: 0px 10px;
        font-size: 0.9rem;
        .project__feedback__comment__author-name {
          font-family: "Montserrat-SemiBold";
          grid-area: authorName;
        }
        .project__feedback__comment__content {
          grid-area: content;
          padding-bottom: 2px;
        }
        .project__feedback__comment__created-at {
          grid-area: createdAt;
          font-size: 0.7rem;
          margin-right: auto;
          color: $baseGrey;
        }
      }
    }
    .project__feedback__comment__create {
      display: grid;
      grid-area: writeNewComment;
      margin-top: 15px;
      position: relative;
      grid-template-areas:"input button" "error error";
      grid-auto-columns: 1fr auto;
      .project__feedback__comment__create__input {
        grid-area: input;
        width: 100%;
        height: 100%;
      }
      .project__feedback__comment__create__button--send {
        margin: 0px;
        padding: 5px;
        position: absolute;
        right: 0px;
        background: none;
        width: auto;
        margin-left: 10px;
        grid-area: button;
        .fa-icon {
          color: black;
        }
      }
      .text-error {
        grid-area: error;
      }
    }
  }
}
</style>
