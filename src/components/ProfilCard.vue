<template>
  <ul class="submenu-list">
    <li><font-awesome-icon class="fa-icon" icon="user-circle"></font-awesome-icon>Profil</li>
    <li><font-awesome-icon class="fa-icon" icon="cog"></font-awesome-icon>Settings</li>
    <li><font-awesome-icon class="fa-icon" icon="power-off"></font-awesome-icon>Logout</li>
  </ul>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';
  .submenu-list {
    width: 300px;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    li {
      padding: 5px 0px;
      border-bottom: 1px solid $baseGrey;
    }
  }

  .submenu-list li:last-child {
    border: none;
  }
</style>
