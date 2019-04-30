<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  watch: {
    authToken(authToken) {
      if (!authToken) {
        this.$router.push('/welcome/signin');
      }
    }
  },
  computed: {
    authToken() {
      return this.$store.getters['user/getAuthToken'];
    }
  },
  mounted() {
    if (this.authToken) {
      this.$http.get(`/users/${this.$store.getters['user/getUser']._id}`).then(({ data: { data } }) => {
        this.$store.dispatch('user/setUser', data.user);
      });
    }
  }
};
</script>

<style lang="scss">
@import './assets/scss/variables';
@import './assets/scss/fonts';

body {
  min-width: 375px;
  font-size: 1em;
  max-width: 100vw;
  color: $baseBlue;
  min-height: 375px;
  @media (max-width: 1280px) {
    font-size: 1rem;
  }
  @media (max-width: 750px) {
    font-size: 1rem;
  }
}

* {
  border: 0;
  margin: 0;
  padding: 0;
  outline: none;
  text-decoration: none;
  box-sizing: border-box;
  list-style: none;
  font-family: 'Montserrat-Light';
  overflow-wrap: break-word;
  user-select: none;
}

h1 {
  font-family: 'Montserrat-Bold';
  text-transform: uppercase;
  font-size: 3em;
  letter-spacing: 1px;
  line-height: 1.4em;
  margin: 25px 0px;
}

h2 {
  font-family: 'Montserrat-Light';
  text-transform: uppercase;
  font-size: 2em;
  letter-spacing: 1px;
  line-height: 1.4em;
  margin: 25px 0px;
}

h3 {
  font-family: 'Montserrat-Regular';
  font-size: 1.2em;
  letter-spacing: 1px;
  line-height: 1.4em;
  text-transform: uppercase;
  margin: 25px 0px;
}

h4 {
  font-size: 0.9em;
  line-height: 1.4em;
  text-transform: uppercase;
  font-family: 'Montserrat-Regular';
  margin: 10px 0px;
}

p {
  font-size: 0.9em;
  line-height: 1.3em;
}

textarea {
  max-width: inherit;
  height: 200px;
  min-height: 100px;
  max-height: 400px;
  resize: vertical;
}

::placeholder {
  color: #000;
}


.text {
  &--error,
  &--success {
    font-size: 0.85em;
    line-height: 1.2em;
    font-weight: bold;
    padding-top: 10px;
    font-family: 'Montserrat-SemiBold';
  }

  &--error {
    color: $baseRed;
  }

  &--success {
    color: $baseGreen;
  }
}

.image-container {
  overflow: hidden;
  height: 60px;
  width: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  img {
    width: 100%;
    height: auto;
  }
}

.fa-icon {
  margin: 0px 10px;
}

.text-center {
  text-align: center;
}

.margin-bottom {
  margin-bottom: 25px;
}

.red-colored {
  color: $baseRed;
  font-family: 'Montserrat-Bold';
}

.box-shadowed {
  box-shadow: 0px 0px 100px rgba(214, 211, 212, 0.8);
}

.box-shadowed-lighter {
  box-shadow: 0px 0px 100px rgba(214, 211, 212, 0.5);
}

.border-round {
  border-radius: 50%;
}

.w--100 {
  width: 100%;
}

.burger-icon__clickable {
  height: 15px;
  width: 25px;
  cursor: pointer;
  .burger-icon__bars {
    width: inherit;
    height: 3px;
    background: #4e4b4b;
    transform: translateY(200%);
    &::after,
    &::before {
      width: inherit;
      height: 3px;
      background: #4e4b4b;
      content: '';
      display: block;
      position: absolute;
      bottom: 200%;
    }
    &::after {
      bottom: auto;
      top: 200%;
    }
  }
}

.form {
  width: 100%;
  max-width: 1400px;
  align-content: flex-start;
  display: flex;
  flex-direction: column;
  font-family: 'Montserrat-Thin';
  font-size: 1em;
  margin-top: 2em;
  label {
    font-size: 0.9em;
    text-transform: uppercase;
    margin: 10px 0px;
    display: block;
  }

  fieldset {
    margin: 10px 0px;
  }

  input,
  textarea,
  select {
    height: 25px;
    border-bottom: 2px solid #000;
    background: none;
    font-size: 0.9em;
    margin: 3px 0px 10px;
    border-bottom: 1px solid $baseBlue;
    display: block;
    width: 100%;
  }

  input[type='checkbox'] {
    width: auto;
    margin: 10px 0px;
    height: auto;
  }
  &__color {
    &--inversed {
      input {
        color: white;

        border-color: white;
      }
    }
  }
}


button,
input.button {
  background-color: $baseRed;
  padding: 15px 25px;
  color: white;
  text-transform: uppercase;
  font-size: 0.9em;
  letter-spacing: 0.2em;
  font-weight: bolder;
  cursor: pointer;
  margin-top: 25px;
  height: auto;
  border: none;
  width: 100%;
}

.container-split {
  display: grid;
  grid-template-areas: 'navigation main-view';
  grid-template-columns: 350px calc(100vw - 380px);
  grid-template-rows: 100vh;
  .left-view {
    grid-area: navigation;
    position: fixed;
    left: 0px;
    top: 0px;
    width: 350px;
  }
  .right-view {
    grid-area: main-view;
    display: flex;
    position: relative;
    flex-direction: column;
    padding: 25px 50px;
    align-items: center;
  }
}
</style>
