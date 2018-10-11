<template>
  <div id="app">
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<style lang="scss">
@import './assets/scss/bootstrap-grid';
@import './assets/scss/variables';
@import './assets/scss/fonts';

body {
  min-width: 320px;
  font-size: 1rem;
  max-width: 100vw;
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
  color: $baseBlue;;
  font-family: 'Montserrat-Light';
}

h1 {
  font-family: 'Montserrat-Bold';
  text-transform: uppercase;
  font-size: 3em;
  letter-spacing: 1px;
  line-height: 1.4em;
}

h2 {
  font-family: 'Montserrat-Light';
  text-transform: uppercase;
  font-size: 2.6em;
  letter-spacing: 1px;
  line-height: 1.4em;
}

h3 {
  font-size: 1.2em;
  letter-spacing: 1px;
  line-height: 1.4em;
}

h4 {
  font-size: 1.1em;
  line-height: 1.4em;
  text-transform: uppercase;
}

h5 {
  font-size: 1.0em;
  line-height: 1.4em;
  font-family: 'Montserrat-SemiBold';
  text-transform: uppercase;
}

p {
  line-height: 1.4em;
  font-size: 1.1em;
}

form {
  display: flex;
  flex-direction: column;
  width: 300px;
}

input {
  height: 25px;
  border-bottom: 2px solid #000;
  background: none;
  margin: 20px auto;
  width: 300px;
}

button, input.button {
  background-color: $baseRed;
  padding: 15px 25px;
  color: white;
  text-transform: uppercase;
  font-size: 0.9em;
  letter-spacing: 0.20em;
  font-weight: bolder;
  cursor: pointer;
  margin-top: 25px;
  height: auto;
  border: none;
}

.validation-error {
  color: #E14D2E;
  font-size: 0.85em;
}

::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color:    #000;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color:    #000;
  opacity:  1;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
  color:    #000;
  opacity:  1;
}
:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color:    #000;
}
::-ms-input-placeholder { /* Microsoft Edge */
  color:    #000;
}

::placeholder { /* Most modern browsers support this now. */
  color:    #000;
}

.min-height-100vh {
  min-height: 100vh;
}

.height-100P {
  height: 100%;
}

.red-colored {
  color: $baseRed;
  font-family:'Montserrat-Bold';
}
</style>
