<template>
    <div class="project-thumbnail">
      <div class="project-thumbnail_box">
        <div class="project-thumbnail_box_top">
          <img class="project_image">
          <div class="project_status">
            <p>In Arbeit</p>
          </div>
        </div>
        <div class="project-thumbnail_box_bottom">
          <p class="project_info">Name des Projektleiters | FB Medien</p>
          <h5>Der Titel des Projektes ist über zwei Zeilen</h5>
          <p class="project_description">Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
             sed diam nonumy eirmod tempor invidunt ut labore et dolore
             magna aliquyam erat, sedsanctus est Lorem ipsum dolor sit amet.</p>
          <div class="row project_metadata">
            <div class="col-6"><p>vor 30 Minuten</p></div>
            <div class="col-2"><p>20</p></div>
            <div class="col-2"><p>20</p></div>
            <div class="col-2"><p>20</p></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';
.project-thumbnail{
  padding:15px;
  height:430px;
  width:30vh;
  .project-thumbnail_box{
    background-color: white;
    box-shadow: 0px -2px 40px rgba(0, 0, 0, 0.1), 0px 2px 40px rgba(0,0,0, 0.1);
    height:100%;
    width: 100%;
    .project-thumbnail_box_top{
      position: relative;
      height:50%;
      background-color: #f4f4f4;
      img {
        position:absolute;
      }
      .project_status{
        position:relative;
        width: 40%;
        top:25px;
        background-color:$baseBlue;
        border-right: 2px solid $fbBlue;
        p{
          text-align: left;
          color:white;
          padding: 5px;
        }
      }
    }
    .project-thumbnail_box_bottom{
      height:50%;
      padding:15px;
      .project_info{
        font-size:0.8em;
        color: $baseRed;
      }
      .project_description{
        font-size:0.9em;
        margin-top:10px;
        margin-bottom:10px;
      }
      .project_metadata{
        font-size: 0.8em;
        p {color: $baseGrey;}
      }
    }
  }
}
</style>
