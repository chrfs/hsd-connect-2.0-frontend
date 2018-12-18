<template>
  <section class="container-split">
    <Navigation></Navigation>
    <main class="project_right-view">
      <div class="project-header">
        <!--  <img class="project_image" :src="imageURL(project.images[0].token)"> -->
          <div class="project_status">
            <p><font-awesome-icon class="fa-icon" icon="clock"></font-awesome-icon>18.12.2018</p>
            <!-- <p><font-awesome-icon class="fa-icon" icon="clock"></font-awesome-icon>{{$moment(project.createdAt).format('L')}}</p> -->
          </div>
          <h3 class="project_title">Wasserski fahren auf Wasserski</h3>
          <!-- <h2>{{project.title}}</h2> -->
      </div>
      <div class="project-content_main">
        <div>
          <h4>Über dieses Projekt</h4>
          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
            sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
            ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
            magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
            sanctus est Lorem ipsum dolor sit amet.</p>
          <div class="project-content_main_icons">
            <font-awesome-icon class="fa-icon" icon="heart"></font-awesome-icon>10
            <font-awesome-icon class="fa-icon" icon="comment"></font-awesome-icon>10
            <font-awesome-icon class="fa-icon" icon="bookmark"></font-awesome-icon>15
          </div>
        </div>
        <div class="project-content_main_comments">
          <FormGenerator class="form" :fields="fields">FRAGE</FormGenerator>
        </div>
      </div>
      <div class="project-content_side">
        <div class="project_team">
          <h4 class="project-content_side_title">Team</h4>
          <div class="project_team_owner">
            <div class="profile_image"></div>
            <p>Katharina Baumgartner <br> Fachbereich Medien <br> B. Sc. Medieninformatik</p>
          </div>
          <div class="project_team_members"></div>
            <div class="profile_image"></div>
            <div class="profile_image translate2"></div>
            <div class="profile_image translate3"></div>
            <p>And 5 other Members.</p>
          <button class="project_team_button">Join the Team</button>
        </div>
        <div class="project_media">
          <h4 class="project-content_side_title">Media</h4>
          <div class="project_media_image"></div>
          <div class="project_media_image"></div>
          <div class="project_media_image"></div>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import Navigation from '../components/Navigation.vue'
export default {
  computed: {},
  methods: {
    fetchProject () {
      this.$http.get(this.$httpRoutes.GET_PROJECTS + '/' + this.$route.params.id, { pageId: this.pageId }).then(({data: { data }}) => {
        this.project = data
      })
    },
    imageURL (token) {
      return this.$APIHost + '/images/' + token
    }
  },
  mounted () {
    this.fetchProject()
  },
  components: { Navigation },
  props: [ 'project' ]
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';

.project_right-view {
  grid-template-columns: 70% 30%;
  grid-template-rows: 30% auto;
  grid-template-areas: "header header" "main side";
  grid-gap: 10px;
  margin: 25px;
  overflow:hidden;
  .project-header {
    grid-area: header;
    background: grey;
    position: relative;
    .project_status {
      position: absolute;
      top: 25px;
      width: auto;
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
    .project_title {
      position: absolute;
      bottom: 0px;
      width: auto;
      left: 20px;
      color: white;
    }
  }
  .project-content_main {
    justify-self:center;
    grid-area: main;
    background-color: white;
    box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.1), 0px 2px 5px rgba(0, 0, 0, 0.1);
    font-size: 0.9em;
    padding: 20px;
    height: auto;
    .project-content_main_icons{
      display:flex;
      justify-content: flex-end;
      fill:transparent;
    }
  }
  .project-content_side {
    grid-area: side;
    grid-template-rows: auto;
    grid-template-areas: "team" "media";
    background-color: white;
    .project-content_side_title {
      padding:10px;
      border-bottom: 1px solid $baseGrey;
    }
    .profile_image {
      background-color: grey;
      margin: 10px;
      display: inline-block;
      width:50px;
      height: 50px;
      border-radius: 100%;
    }
    .project_team {
      grid-area: team;
      box-shadow: 2px -2px 5px rgba(0, 0, 0, 0.1), 0px 2px 5px rgba(0,0,0, 0.1);
      p {
        font-size: 0.6em;
        display: inline-block;
      }
      .translate2 {
        border: 1px solid white;
        transform: translate(-100%)
      }
      .translate3 {
        border: 1px solid white;
        transform: translate(-200%)
      }
      .project_team_button {
        background-color: $baseLightGrey;
        width: 100%;
        color: $baseBlue;
        font-size: 0.6em;
        font-family: 'Montserrat-Medium';
        letter-spacing: inherit;
      }
    }
    .project_media {
      grid-area: media;
      box-shadow: 2px -2px 5px rgba(0, 0, 0, 0.1), 0px 2px 5px rgba(0,0,0, 0.1);
      .project_media_image{
        margin: 5px;
        background-color: grey;
        width: 100px;
        height: 100px;
        display: inline-block;
      }
    }
  }
}
</style>
