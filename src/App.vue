<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import './assets/scss/bootstrap-grid.scss';


body {
  font-size: 1rem;
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
  font-size: 14px;
  letter-spacing: 0.25em;
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
