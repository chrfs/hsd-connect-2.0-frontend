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
        <header class="project__header" :style="{ 'background-image': 'url(' + getProjectHeaderImageURL + ')' }">
          <div class="project__status">
            <p>{{ $moment(project.createdAt).format('L') }}</p>
          </div>
          <h3>{{ project.title }}</h3>
        </header>
        <div class="project__description box-shadowed">
          <h3>Description:</h3>
          <p>{{ project.description }}</p>
          <div class="project__meta">
            <div class="project__meta--info">
              <span class="project__meta--likes">{{ project.likedBy ? project.likedBy.length : 0 }} Likes</span>
              <span class="project__meta__comments">{{ project.feedback ? project.feedback.length : 0 }} Comments</span>
            </div>
            <div class="project__meta__buttons">
              <span class="project__meta--likes">
                <font-awesome-icon
                  @click="likeProject"
                  class="fa-icon"
                  :icon="isLikedProject ? ['fas', 'heart'] : ['far', 'heart']"
                ></font-awesome-icon>
              </span>
              <span class="project__meta--feedback">
                <font-awesome-icon
                  @click="newFeedback.show = !newFeedback.show"
                  class="fa-icon"
                  :icon="newFeedback.show ? ['fas', 'comment'] : ['far', 'comment']"
                ></font-awesome-icon>
              </span>
              <span class="project__meta--bookmark">
                <font-awesome-icon
                  @click="bookmarkProject"
                  class="fa-icon"
                  :icon="isBookmarkedProject ? ['fas', 'bookmark'] : ['far', 'bookmark']"
                ></font-awesome-icon>
              </span>
            </div>
          </div>
        </div>
        <div class="project__fields">
          <div class="project__info margin-bottom box-shadowed">
            <h4 class="project__info-header">Team</h4>
            <div class="project__info-content">
              <div class="project__members">
                <div class="image-container">
                  <img class="border-round" :src="getProjectOwnerImageURL" alt="Project Owner Image" />
                </div>
                <p>{{ project.user.firstname }} {{ project.user.lastname }}</p>
              </div>
            </div>
            <div class="project__info-content" v-if="project.members.length">
              <div class="project__members" v-for="member in project.members" :key="member._id">
                <div class="image-container">
                  <img class="border-round" :src="getUserImageURL(member.image)" alt="Project Owner Image" />
                </div>
                <p>{{ project.user.firstname }} {{ project.user.lastname }}</p>
              </div>
            </div>
            <button v-if="project.searchingParticipants" class="project__join">
              JOIN THE TEAM
            </button>
          </div>
          <div class="project__info box-shadowed" v-if="project.images.length">
            <h4 class="project__info-header">Media</h4>
            <div class="project__info-content" v-if="project.images.length">
              <div class="project__image" v-for="image in project.images" :key="image._id">
                <img :src="getProjectImageURL(image.token)" alt="Project Image" />
              </div>
            </div>
          </div>
        </div>
        <div v-show="newFeedback.show" class="feedback__create box-shadowed">
          <div class="feedback__create-box">
            <h4>Post Feedback</h4>
            <textarea
              spellcheck="false"
              v-model="newFeedback.content"
              placeholder="Write your thoughts.."
              class="feedback__textarea"
            ></textarea>
            <p class="text-error">{{ newFeedback.message }}</p>
          </div>
          <button @click="postFeedback" class="feedback__create-button">Send</button>
        </div>
        <div class="feedback__entries">
          <div class="feedback box-shadowed-lighter" v-for="feedback in project.feedback" :key="feedback._id">
            <div class="image-container feedback__author-image">
              <img
                class="border-round"
                :src="getUserImageURL(feedback.user.image ? feedback.user.image.token : null)"
                alt="User Image"
              />
            </div>
            <p class="feedback__author-name">{{ feedback.user.firstname }} {{ feedback.user.lastname }}</p>
            <p class="feedback__content">{{ feedback.content }}</p>
            <p class="feedback__created-at">{{ $moment(feedback.createdAt).format('L') }}</p>
            <div class="feedback__comments">
              <div class="feedback__comment" v-for="comment in feedback.comments" :key="comment._id">
                <p class="comment__created-at">{{ $moment(comment.createdAt).format('L') }}</p>
                <p class="comment__author-name">{{ comment.user.firstname }} {{ comment.user.lastname }}</p>
                <p class="comment__content">{{ comment.content }}</p>
              </div>
            </div>
            <div class="project__meta">
              <div class="project__meta--info">
                <span class="project__meta--likes">{{ feedback.likedBy ? feedback.likedBy.length : 0 }} Likes</span>
                <span class="project__meta--feedback">{{ feedback.comments ? feedback.comments.length : 0 }} Comments</span>
              </div>
              <div class="project__meta__buttons">
                <span class="project__meta--likes">
                  <font-awesome-icon
                    @click="likeProjectFeedback(feedback._id)"
                    class="fa-icon"
                    :icon="isLikedProjectFeedback(feedback._id) ? ['fas', 'heart'] : ['far', 'heart']"
                  ></font-awesome-icon>
                </span>
                <span class="project__meta--feedback">
                  <font-awesome-icon
                    @click="feedbackComments[feedback._id].show = !feedbackComments[feedback._id].show"
                    class="fa-icon"
                    :icon="feedbackComments[feedback._id].show ? ['fas', 'comment'] : ['far', 'comment']"
                  ></font-awesome-icon>
                </span>
              </div>
            </div>
            <div class="comment__create" v-show="feedbackComments[feedback._id].show">
              <input
                class="comment__create__input"
                v-model="feedbackComments[feedback._id].content"
                placeholder="Write your comment here..."
              />
              <button @click="postFeedbackComment(feedback._id)" class="comment__create-button">
                <font-awesome-icon class="fa-icon" :icon="['fab', 'telegram-plane']"></font-awesome-icon>
              </button>
              <p class="text-error">{{ feedbackComments[feedback._id].message }}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </section>
</template>

<script>
import Error from '../components/Error.vue';
import Navigation from '../components/Navigation.vue';

export default {
  data: () => ({
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
    },
    initialized: false
  }),
  watch: {
    project: {
      handler() {
        if (!this.project.feedback) {
          return;
        }

        this.feedbackComments = this.project.feedback.reduce((acc, { _id: feedbackId }) => {
          if (this.feedbackComments[feedbackId]) {
            acc[feedbackId] = this.feedbackComments[feedbackId];
          } else {
            acc[feedbackId] = JSON.parse(JSON.stringify(this.newFeedbackComment));
          }
          return acc;
        }, {});
      },
      deep: true
    },
    projectId() {
      this.fetchProject();
    }
  },
  computed: {
    projectId() {
      return this.$route.params.id;
    },
    project() {
      const project = this.$store.getters['projects/getProject'];
      if (project._id !== this.projectId) {
        return null;
      }
      return project;
    },
    user() {
      return this.$store.getters['user/getUser'];
    },
    isBookmarkedProject() {
      return this.user.bookmarkedProjects.includes(this.project._id);
    },
    isLikedProject() {
      return this.project && this.project.likedBy.includes(this.user._id);
    },
    getProjectHeaderImageURL() {
      const projectImages = this.project ? this.project.images : [];
      const imageToken = projectImages.length ? projectImages[0].token : null;
      return this.getProjectImageURL(imageToken);
    },
    getProjectOwnerImageURL() {
      const imageToken = this.project && this.project.user.image ? this.project.user.image.token : null;
      return this.getUserImageURL(imageToken);
    }
  },
  methods: {
    isLikedProjectFeedback(feedbackId) {
      const feedback = this.project.feedback.find(el => el._id === feedbackId);
      return feedback && feedback.likedBy.includes(this.user._id);
    },
    getProjectImageURL(imageToken) {
      return imageToken
        ? `${this.$APIHost}/projects/${this.projectId}/images/${imageToken}`
        : 'https://via.placeholder.com/800x200';
    },
    getUserImageURL(imageToken) {
      return imageToken
        ? `${this.$APIHost}/user/${this.project.user._id}/images/${imageToken}`
        : 'https://via.placeholder.com/200x200';
    },
    fetchProject() {
      this.notFound = false;
      this.$http
        .get(`/projects/${this.projectId}`, { pageId: this.pageId })
        .then(({ data: { data } }) => {
          this.$store.dispatch('projects/setProject', data);
        })
        .catch(res => {
          this.notFound = true;
        });
    },
    postFeedback() {
      this.newFeedback.message = '';
      this.$http
        .post(`/projects/${this.project._id}/feedback`, {
          feedback: this.newFeedback
        })
        .then(({ data: { data } }) => {
          // TODO: SET NOTIFICATION
          this.$store.dispatch('projects/addProjectFeedbackEntry', data);
          this.newFeedback.content = '';
        })
        .catch(res => {
          const { response } = res;
          if (response.data.status === 401 || response.data.name === 'TokenExpiredError') {
            this.$store.dispatch('user/setAuthToken', null);
            this.$router.push('/');
            return;
          }
          const { data } = response;
          if (data.errors) {
            this.newFeedback.message = data.errors.content;
          }
        });
    },
    postFeedbackComment(feedbackId) {
      const feedbackComment = this.feedbackComments[feedbackId];
      feedbackComment.message = '';
      this.$http
        .post(`/projects/${this.project._id}/feedback/${feedbackId}/comment`, {
          comment: feedbackComment
        })
        .then(({ data: { data } }) => {
          // TODO: SET NOTIFICATION
          this.$store.dispatch('projects/updateProjectFeedbackEntry', data);
          feedbackComment.content = '';
        })
        .catch(res => {
          const { response } = res;
          if ((response.data && response.data.status === 401) || response.data.name === 'TokenExpiredError') {
            this.$store.dispatch('user/setAuthToken', null);
            this.$router.push('/');
            return;
          }
          const { data } = response;
          if (data.errors) {
            this.feedbackComments[feedbackId].message = data.errors.content;
          }
        });
    },
    bookmarkProject() {
      this.$store.dispatch('user/bookmarkProject', this.project._id);
    },
    likeProject() {
      this.$http.put(`/projects/${this.project._id}/like`).then(({ data: { data } }) => {
        this.$store.dispatch('projects/setProject', {
          ...this.project,
          likedBy: data.likedBy
        });
      });
    },
    likeProjectFeedback(feedbackId) {
      this.$http.put(`/projects/${this.project._id}/feedback/${feedbackId}/like`).then(({ data: { data } }) => {
        this.$store.dispatch('projects/updateProjectFeedbackEntry', {
          _id: feedbackId,
          ...data
        });
      });
    }
  },
  mounted() {
    this.fetchProject();
  },
  components: { Navigation, Error }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';
.project {
  display: grid;
  grid-template-areas: 'header header' 'description info' 'feedbackCreate .' 'feedback .';
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
    background: $baseWhite;
    text-align: justify;
    h3 {
      font-size: 15px;
      margin: 0;
      padding-bottom: 10px;
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
    .project__meta--info {
      font-size: 0.8rem;
      display: flex;
      justify-content: flex-end;
      .project__meta--likes,
      .project__meta__comments {
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
  .project__fields {
    .project__info {
      grid-area: info;
      align-self: flex-start;
      background: $baseWhite;
      width: 100%;
      .project__info-header {
        border-bottom: 1px solid $baseLightGrey;
        padding: 30px 40px 10px;
        margin: 0px;
      }
      .project__info-content {
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
      .project__join {
        width: 100%;
        background: $baseRed;
        color: $baseWhite;
        font-family: 'Montserrat-Regular';
        letter-spacing: 0px;
      }
    }
  }
  .feedback__create {
    grid-area: feedbackCreate;
    background: $baseWhite;
    .feedback__create-box {
      padding: 0px 25px;
    }
    display: flex;
    flex-direction: column;
    background: $baseWhite;
    .feedback__textarea {
      width: 100%;
      height: 100px;
    }
    .feedback__create-button {
      margin-top: 0px;
    }
  }
  .feedback__entries {
    grid-area: feedback;
    background: transparent;
    .feedback {
      display: grid;
      min-height: 100px;
      margin-bottom: 10px;
      border-bottom: 1px solid $baseLightGrey;
      border-top: 1px solid $baseLightGrey;
      grid-template-areas:
        'authorImage authorName createdAt'
        'authorImage content content'
        '. comments comments'
        'meta meta meta'
        'writeNewComment writeNewComment writeNewComment';
      grid-template-columns: 80px 1fr;
      padding: 20px;
      justify-content: center;
      align-items: center;
      .feedback__author-name {
        font-family: 'Montserrat-SemiBold';
        padding-bottom: 10px;
        grid-area: authorName;
      }
      .feedback__content {
        grid-area: content;
        margin-bottom: 25px;
      }
      .feedback__created-at {
        color: $baseGrey;
        font-size: 0.7rem;
        margin-right: auto;
      }
      .feedback__author-image {
        align-self: flex-start;
        grid-area: authorImage;
        margin: 0;
      }
    }
    .feedback__comments {
      grid-area: comments;
      .feedback__comment {
        margin-bottom: 15px;
        border-left: 1px solid $baseGrey;
        display: grid;
        grid-template-areas: 'authorName createdAt' 'content content';
        grid-template-columns: 1fr;
        padding: 0px 10px;
        font-size: 0.9rem;
        .comment__author-name {
          font-family: 'Montserrat-SemiBold';
          grid-area: authorName;
        }
        .comment__content {
          grid-area: content;
          padding-bottom: 2px;
        }
        .comment__created-at {
          grid-area: createdAt;
          font-size: 0.7rem;
          margin-right: auto;
          color: $baseGrey;
        }
      }
    }
    .comment__create {
      display: grid;
      grid-area: writeNewComment;
      margin-top: 15px;
      position: relative;
      grid-template-areas: 'input button' 'error error';
      grid-auto-columns: 1fr auto;
      .comment__create__input {
        grid-area: input;
        width: 100%;
        height: 100%;
      }
      .comment__create-button {
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
