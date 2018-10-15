<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap.scss';
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
  margin: 10px 0px;
}

p {
  font-size: 0.9em;
  line-height: 1.3em;
}

label {
  font-size: 0.8em;
  display: block;
}

form {
  display: flex;
  flex-direction: column;
  .field-invalid {
    border-color: red;
  }
  fieldset {
    margin: 10px 0px;
  }
  input {
    height: 25px;
    border-bottom: 2px solid #000;
    background: none;
    width: 320px;
    font-size: 0.9em;
    margin: 0px auto 10px auto;
    border-bottom: 1px solid white;
  }
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

.flex-justify {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.text-error {
  color: #E14D2E;
  font-size: 0.85em;
  line-height: 1.2em;
  font-weight: bold;
}

.fa-icon {
  margin: 0px 10px;
}

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

.box-shadowed {
  box-shadow: 0px -2px 40px rgba(0, 0, 0, 0.1), 0px 2px 40px rgba(0,0,0, 0.1);
}
</style>
