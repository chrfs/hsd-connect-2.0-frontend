<template>
  <main>
    <div id="welcome-left">
      <WelcomeHeader></WelcomeHeader>
      <div class="article-slider">
        <div class="article">
          <transition-group :name="'translate-article-'+slider.activeSlideDirection" mode="out-in">
              <article v-show="articleIndex === slider.activeIndex" v-for="(article, articleIndex) in slider.articles" v-bind:key="articleIndex">
                <h2 class="article_headline" v-html="article.title"></h2>
                <p class="article_paragraph" v-html="article.description"></p>
              </article>
          </transition-group>
          <div id="articles_selector_bars">
            <span class="articles_selector_bar" v-for="(articleBar, articleBarIndex) in slider.articles" :style="{left: ((slider.articleBarIndex)*slider.activeBarWidth) + 'px', width: slider.activeBarWidth+'px'}" v-bind:key="articleBarIndex"></span>
            <span class="articles_selector_bar article-active" :style="{transform: 'translateX('+((slider.activeIndex)*slider.activeBarWidth) + 'px)', width: slider.activeBarWidth+'px'}"></span>
          </div>
          <button id="lets-connect-button2" @click="changeComponent" >Let's connect</button>
        </div>
      </div>
    </div>
    <aside id="welcome-right">
      <WelcomeIndex class="component" :class="{'component--show': isActiveComponent('WelcomeIndex')}"></WelcomeIndex>
      <WelcomeSignUp class="component" :class="{'component--show': isActiveComponent('WelcomeSignUp')}" :isActive="isActiveComponent('WelcomeSignUp')"></WelcomeSignUp>
      <WelcomeSignIn class="component" :class="{'component--show': isActiveComponent('WelcomeSignIn')}" :isActive="isActiveComponent('WelcomeSignIn')"></WelcomeSignIn>
      <WelcomeAbout class="component" :class="{'component--show': isActiveComponent('WelcomeAbout')}"></WelcomeAbout>
    </aside>
  </main>
</template>

<script>
import WelcomeHeader from '../components/Welcome/Header.vue'
import WelcomeIndex from '../components/Welcome/Index.vue'
import WelcomeSignIn from '../components/Welcome/SignIn.vue'
import WelcomeSignUp from '../components/Welcome/SignUp.vue'
import WelcomeAbout from '../components/Welcome/About.vue'

export default {
  data: () => {
    return {
      slider: {
        articles: [
          {
            title: 'Projekte zusammen <span class="red-colored">meistern</span>',
            description: `Setze deine Hochschulprojekte mit Studierenden aus anderen Fachbereichen gemeinsam um. Poste jetzt dein Projekt!
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
          },
          {
            title: 'Gemeinsam an Aufgaben <span class="red-colored">wachsen</span>',
            description: `Herausfordernde Projektaufgaben gemeinsam im Team lösen!
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
          },
          {
            title: 'Erfahrungen <span class="red-colored">austauschen</span>',
            description: `Erlebe Gruppenarbeiten neu! Such dir neue Projekte aus anderen Fachbereichen und erweitere deinen Horizont! +
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.+
                          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
          },
          {
            title: 'Studierende besser <span class="red-colored">kennenlernen</span>',
            description: `Lerne neue Kommilitonen der Hochschule kennen. Finde dein Projektteam!+
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.+
                          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
          },
          {
            title: 'Ziele <span class="red-colored">erreichen</span>',
            description: `Gemeinsam an einem Strang ziehen und Projekte erfolgreich beenden!+
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.+
                          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
          }
        ],
        activeIndex: 2,
        activeBarWidth: 50,
        activeSlideDirection: 'right'
      },
      components: {
        '/welcome': 'WelcomeIndex',
        '/welcome/signin': 'WelcomeSignIn',
        '/welcome/signup': 'WelcomeSignUp',
        '/welcome/about': 'WelcomeAbout'
      },
      activeComponent: {
        name: 'WelcomeIndex',
        path: '/welcome'
      }
    }
  },
  watch: {
    $route () {
      if (this.$route.path !== this.activeComponent.path) {
        this.setActiveComponent()
      }
    }
  },
  methods: {
    setActiveComponent () {
      this.activeComponent = {
        name: this.components[this.$route.path],
        path: this.$route.path
      }
    },
    changeComponent () {
      this.$router.push('/welcome/signin')
      window.scrollTo(0, document.body.scrollHeight)
    },
    startSlider () {
      setInterval(() => {
        if (!document.hidden) {
          const nextSlide =
            this.slider.activeIndex + 1 >= this.slider.articles.length
              ? 0
              : this.slider.activeIndex + 1
          this.changeSlide(nextSlide)
        }
      }, 4000)
    },
    changeSlide (articleIndex) {
      this.slider.activeSlideDirection =
        articleIndex > this.slider.activeIndex ? 'right' : 'left'
      this.slider.activeIndex = articleIndex
    },
    isActiveComponent (componentName) {
      return this.activeComponent.name === componentName
    }
  },
  mounted () {
    this.setActiveComponent()
    this.startSlider()
  },
  components: { WelcomeHeader, WelcomeIndex, WelcomeSignIn, WelcomeSignUp, WelcomeAbout }
}
</script>

<style lang="scss">
@import '../assets/scss/variables';
main {
  display: grid;
  grid-template-areas:  "left right";
  grid-template-columns: minmax(400px, 60%) minmax(400px, 40%);
  height: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  @media(max-width: 992px) {
    grid-template-areas: "left" "right";
    grid-template-rows: 1fr minmax(600px, 1fr);
    grid-template-columns: 1fr;
  }
  #welcome-left {
    display: grid;
    grid-area: left;
    /* autoprefixer: off */
    grid-template-areas:  "header"  "articles";
    grid-template-rows: 80px minmax(350px, 1fr);
    position: relative;
    padding: 20px 25px;
    flex-direction: column;
    .article-slider {
      grid-area: articles;
      align-self: center;
      max-width: 800px;
      height: 100%;
      height: auto;
      position: relative;
      article {
        display: flex;
        flex-direction: column;
        align-content: center;
        padding-bottom: 20px;
        max-width: 100%;
        height: 220px;
        @media(max-width: 992px) {
          height: 250px;
        }
        @media(max-width: 500px) {
          height: 300px;
        }
        .article_headline {
          font-size: 1.3em;
        }
      }
      #articles_selector_bars {
        height: 4px;
        // position: absolute;
        bottom: 10px;
        .articles_selector_bar {
          background: #f2f2f2;
          height: 4px;
          float: left;
        }
        .article-active {
          background: #e40529;
          position: absolute;
          left: 0px;
          z-index: 1;
          transition: transform 1.2s cubic-bezier(0.12, 0.41, 0.27, 0.16);
        }
      }
      #lets-connect-button2{
        margin-top: 50px;
        display: none;
        @media(max-width: 992px) {
          display: block;
        }
      }
    }
  }

  #welcome-right {
    padding: 0px;
    position: relative;
    grid-area: right;
    width: 40vw;
    min-width: 400px;
    @media(max-width: 992px) {
      overflow: hidden;
      height: 100vh;
      width: 100%;
      max-width: 100%;
      padding-top: 25px;
    }
    .component {
      position: absolute;
      transform: translateX(100%);
      z-index: 0;
      transition: transform .5s cubic-bezier(.55,.62,.36,.34);
      @media(max-width: 992px) {
        transform: translateY(100%);
      }
      &.component--show {
        transform: translate(0%);
        z-index: 1;
        @media(max-width: 992px) {
        transform: translate(0%);
      }
      }
    }

    .welcome-right-background {
      background-image: $blueGradient;
      position: absolute;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      display: flex;
      @media (max-width: 991px) {
        transform: translateX(0px);
      }
    }
    .welcome-right-form {
      width: 320px;
      h4, input, label, fieldset {
        color: white;
        width: 320px;
        border-color: white;
        font-family: "Montserrat-Thin";
      }
      input {
        margin: 3px 0px 0px;
      }
    }
  }

  .translate-article-right-enter-active {
    transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1) 0.9s;
    transform: translateX(0px);
  }
  .translate-article-right-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
    position: absolute;
    top: 0px;
  }
  .translate-article-right-enter, .translate-article-right-leave-to {
    transform: translateX(-10px);
    opacity: 0;
  }

  .translate-article-left-enter-active {
    transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1) 0.9s;
    transform: translateX(0px);
  }
  .translate-article-left-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
    position: absolute;
    top: 0px;
  }
  .translate-article-left-enter, .translate-article-left-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
}
</style>
