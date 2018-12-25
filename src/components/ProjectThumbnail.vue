<template>
    <div class="project" @click="redirectToProject(project._id)">
      <div class="project__box">
        <div class="project__box__top">
          <img v-if="project.images.length" class="project__image" :src="imageURL(project.images[0].token)">
          <div class="project__status">
            <p><font-awesome-icon class="fa-icon" icon="clock"></font-awesome-icon>{{$moment(project.createdAt).format('L')}}</p>
          </div>
        </div>
        <div class="project__box__bottom">
          <p class="project__info">{{project.user.fullname}} | FB Medien</p>
          <h5 class=project__title>{{project.title}}</h5>
          <p class="project__description">{{project.description | shortenString}}</p>
          <div class="row project__metadata">
            <p>{{project.created_at}}</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  methods: {
    imageURL (imageToken) {
      if (!imageToken) return 'https://via.placeholder.com/370x200'
      return `${this.$APIHost}/projects/${this.project._id}/images/${imageToken}`
    },
    redirectToProject (projectId) {
      this.$store.dispatch('projects/setProject', this.project)
      this.$router.push('/projects/' + projectId)
    }
  },
  filters: {
    shortenString (text) {
      return text.substr(0, 140)
    }
  },
  props: [ 'project' ]
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';
.project {
  padding: 15px;
  height: 430px;
  .project__box {
    background-color: white;
    box-shadow: 0px -2px 40px rgba(0, 0, 0, 0.1), 0px 2px 40px rgba(0,0,0, 0.1);
    height: 100%;
    width: 100%;
    .project__box__top {
      position: relative;
      height: 50%;
      background-color: #f4f4f4;
      overflow: hidden;
      img {
        position: absolute;
        min-width: 100%;
        min-height: 100%;
        transform: translateX(-50%);
        left: 50%;
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
    .project__box__bottom {
      height: 50%;
      padding: 15px;
      .project__info {
        font-size: 0.8em;
        color: $baseRed;
      }
      .project__description {
        font-size: 0.9em;
        margin-top: 10px;
        margin-bottom: 10px;
      }
      .project__metadata {
        font-size: 0.8em;
        p {
          color: $baseGrey;
        }
      }
    }
  }
}
</style>
