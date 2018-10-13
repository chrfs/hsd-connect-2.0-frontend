<template>
  <div id="app">
    <router-view/>
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
  font-family: 'Montserrat-Light';
  color: $baseBlue;
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
}

h1 {
  font-family: 'Montserrat-Bold';
  text-transform: uppercase;
  font-size: 3em;
  letter-spacing: 1px;
  line-height: 1.4em;
  margin: 25px auto;
}

h2 {
  font-family: 'Montserrat-Light';
  text-transform: uppercase;
  font-size: 2em;
  letter-spacing: 1px;
  line-height: 1.4em;
  margin: 25px auto;
}

h3 {
  font-size: 1.2em;
  letter-spacing: 1px;
  line-height: 1.4em;
  text-transform: uppercase;
  margin: 25px auto;
}

h4 {
  font-size: 0.9em;
  line-height: 1.4em;
  text-transform: uppercase;
  margin: 25px auto;
}

p {
  font-size: 0.9em;
  line-height: 1.3em;
}

label {
  font-size: 0.8em;
}

form {
  display: flex;
  flex-direction: column;
  width: 300px;
  .field-invalid {
    border-color: red;
  }
  fieldset {
    margin: 0px auto 20px;
  }
  input {
    height: 25px;
    border-bottom: 2px solid #000;
    background: none;
    width: 300px;
    font-size: 0.9em;
    margin: 10px auto;
    border-bottom: 1px solid white;
  }
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

.text-error {
  color: #E14D2E;
  font-size: 0.85em;
  line-height: 1.2em;
  font-weight: bold;
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
