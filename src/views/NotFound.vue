<template>
  <div class="right-view">
    <Error>
      <template slot="message">
        <p>We looked everywhere, but we couldn't find the requested page.</p>
      </template>
      <template slot="action">
        <button @click="$router.push('/')">Go Back</button>
      </template>
    </Error>
  </div>
</template>

<script>
import Error from '../components/Error.vue';

export default {
  components: { Error }
};
</script>

<style lang="scss" scoped></style>
