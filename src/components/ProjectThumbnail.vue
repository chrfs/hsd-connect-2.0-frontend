<template>
    <div class="project-thumbnail ">
      <div class="project-thumbnail_box">
        <div class="project-thumbnail_box_top">
          <img class="project_image" :src="imageURL(project.images[2  ].token)">
          <div class="project_status">
            <p>{{project.status}}</p>
          </div>
        </div>
        <div class="project-thumbnail_box_bottom">
          <p class="project_info">Name des Projektleiters | FB Medien</p>
          <h5 class=project_title>{{project.title}}</h5>
          <p class="project_description">{{project.description | shortenString}}</p>
          <div class="row project_metadata">
            <p>{{project.created_at}}</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  computed: {
  },
  methods: {
    imageURL (token) {
      return this.$APIHost + '/images/' + token
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
.project-thumbnail {
  padding: 15px;
  height: 430px;
  .project-thumbnail_box {
    background-color: white;
    box-shadow: 0px -2px 40px rgba(0, 0, 0, 0.1), 0px 2px 40px rgba(0,0,0, 0.1);
    height: 100%;
    width: 100%;
    .project-thumbnail_box_top {
      position: relative;
      height: 50%;
      background-color: #f4f4f4;
      img {
        position: absolute;
      }
      .project_status {
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
    .project-thumbnail_box_bottom {
      height: 50%;
      padding: 15px;
      .project_info {
        font-size: 0.8em;
        color: $baseRed;
      }
      .project_image {
        overflow: hidden;
      }
      .project_description {
        font-size: 0.9em;
        margin-top: 10px;
        margin-bottom: 10px;
      }
      .project_metadata {
        font-size: 0.8em;
        p {
          color: $baseGrey;
        }
      }
    }
  }
}
</style>
