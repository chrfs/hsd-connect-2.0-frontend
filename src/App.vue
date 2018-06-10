<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import './assets/scss/bootstrap-grid.scss';


body {
  font-size: 1rem;
  @media (max-width: 1280px) {
    font-size: 0.8rem;
  }
  @media (max-width: 750px) {
    font-size: 0.65rem;
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
  color: #000;
  font-family: Arial;
}

button {
  background-color: #e40529;
  padding: 15px 25px;
  color: white;
  font-size: 0.9em;
  letter-spacing: 0.20em;
  font-weight: bolder;
  cursor: pointer;
}

h1 {
  font-size: 3em;
  letter-spacing: 1px;
  line-height: 1.4em;
}

.min-height-100vh{
  min-height: 100vh;
}

.height-100P {
  height: 100%;
}

.red-colored {
  color: #e40529;
}
</style>
