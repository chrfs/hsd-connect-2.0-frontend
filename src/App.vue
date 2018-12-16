<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import './assets/scss/variables';
@import './assets/scss/fonts';

body {
  min-width: 375px;
  font-size: 1.0em;
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
  display: block
}

form {
  display: flex;
  flex-direction: column;
}
.field-invalid {
  border-color: red;
}
fieldset {
  margin: 10px 0px;
}

input, textarea, select {
  height: 25px;
  border-bottom: 2px solid #000;
  background: none;
  font-size: 0.9em;
  margin: 0px auto 10px auto;
  border-bottom: 1px solid $baseBlue;
}

input[type=checkbox] {
  width: auto;
  margin: 10px 0px;
  height: auto;
}

textarea {
  max-width: inherit;
  height: 200px;
  max-height: 300px;
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

.text-error {
  color: #E14D2E;
  font-size: 0.85em;
  line-height: 1.2em;
  font-weight: bold;
}

.fa-icon {
  margin: 0px 10px;
}

.red-colored {
  color: $baseRed;
  font-family:'Montserrat-Bold';
}

.box-shadowed {
  box-shadow: 0px -2px 40px rgba(0, 0, 0, 0.1), 0px 2px 40px rgba(0,0,0, 0.1);
}

.burger-icon-clickable {
  height: 15px;
  width: 25px;
  cursor: pointer;
  .burger-icon-bars {
    width: inherit;
    height: 3px;
    background: #4e4b4b;
    transform: translateY(200%);
    &::after, &::before {
      width: inherit;
      height: 3px;
      background: #4e4b4b;
      content: "";
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
  margin: 0 auto;
  width: 100%;
  max-width: 1400px;
  align-content: flex-start;
  font-family: 'Montserrat-Medium';
  font-size: 1.0em;
  * {
    width: 100%
  }
  input.button{
    font-size: 0.8em;
  }

}

.container-split {
  display: grid;
  grid-template-areas: "navigation main-view";
  grid-template-columns: 380px calc(100vw - 380px);
  grid-template-rows: 100vh;
  .left-view {
    grid-area: navigation;
    position: fixed;
    left: 0px;
    top: 0px;
    width: 380px;
  }
  .right-view {
    grid-area: main-view;
    display: flex;
    flex-direction: column;
    padding: 25px 50px;
  }
}
</style>
