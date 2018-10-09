<template>
    <div class="project-thumbnail">
      <div class="project-thumbnail_box">
        <div class="project-thumbnail_box_top"></div>
        <div class="project-thumbnail_box-bottom">
          <p class="project_info"></p>
          <h3>Titel des Projektes</h3>
          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
             sed diam nonumy eirmod tempor invidunt ut labore et dolore
             magna aliquyam erat, sed diam voluptua. At vero eos et accusam
             et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est</p>
        </div>
      </div>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';
.project-thumbnail{
  padding:15px;
  height:400px;
  width:30vh;
  .project-thumbnail_box{
    background-color: white;
    box-shadow: 0px -2px 40px rgba(0, 0, 0, 0.1),
                0px 2px 40px rgba(0,0,0, 0.1);
    height:100%;
    width: 100%
  }
}
</style>
