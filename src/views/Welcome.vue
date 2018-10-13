<template>
  <section class="container-fluid">
    <main class="row">
      <div id="left-side" class="col-12 col-lg-6 offset-lg-1 min-height-100vh">
        <WelcomeHeader></WelcomeHeader>
        <div class="articles">
          <transition-group :name="'translate-article-'+slider.activeSlideDirection" tag="div" mode="out-in">
              <article class="row" v-show="articleIndex === slider.activeIndex" v-for="(article, articleIndex) in slider.articles" v-bind:key="articleIndex">
                <div class="col-12">
                  <h2 class="article_headline" v-html="article.title"></h2>
                  <p class="article_paragraph" v-html="article.description"></p>
                </div>
              </article>
          </transition-group>
            <div id="articles_selector_bars">
              <span class="articles_selector_bar" v-for="(articleBar, articleBarIndex) in slider.articles" :style="{left: ((slider.articleBarIndex)*slider.activeBarWidth) + 'px', width: slider.activeBarWidth+'px'}" v-bind:key="articleBarIndex"></span>
              <span class="articles_selector_bar article-active" :style="{transform: 'translateX('+((slider.activeIndex)*slider.activeBarWidth) + 'px)', width: slider.activeBarWidth+'px'}"></span>
            </div>
        </div>
      </div>
        <div id="right-side" class="col-12 col-lg-5">
          <WelcomeIndex class="right-side_component" :class="{'right-side_component--show': isActiveComponent('WelcomeIndex')}"></WelcomeIndex>
          <WelcomeSignUp class="right-side_component" :class="{'right-side_component--show': isActiveComponent('WelcomeSignUp')}" :isActive="isActiveComponent('WelcomeSignUp')"></WelcomeSignUp>
          <WelcomeSignIn class="right-side_component" :class="{'right-side_component--show': isActiveComponent('WelcomeSignIn')}" :isActive="isActiveComponent('WelcomeSignIn')"></WelcomeSignIn>
          <WelcomeAbout class="right-side_component" :class="{'right-side_component--show': isActiveComponent('WelcomeAbout')}"></WelcomeAbout>
      </div>
    </main>
  </section>
</template>

<script>
import WelcomeHeader from '../components/Welcome/Navigation.vue'
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
            title: 'Projekte zusammen<br><span class="red-colored">meistern</span>',
            description: 'Setze deine Hochschulprojekte mit Studierenden aus anderen Fachbereichen gemeinsam um. Poste jetzt dein Projekt!'
          },
          {
            title: 'Gemeinsam an Aufgaben <span class="red-colored">wachsen</span>',
            description: 'Herausfordernde Projektaufgaben gemeinsam im Team lösen!'
          },
          {
            title: 'Erfahrungen <span class="red-colored">austauschen</span>',
            description: 'Erlebe Gruppenarbeiten neu! Such dir neue Projekte aus anderen Fachbereichen und erweitere deinen Horizont! '
          },
          {
            title: 'Studierende besser <span class="red-colored">kennenlernen</span>',
            description: 'Lerne neue Kommilitonen der Hochschule kennen. Finde dein Projektteam!'
          },
          {
            title: 'Ziele <span class="red-colored">erreichen</span>',
            description: 'Gemeinsam an einem Strang ziehen und Projekte erfolgreich beenden!'
          }
        ],
        activeIndex: 0,
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

<style lang="scss" scoped>
section {
  height: 100%;
  min-height: 100vh;
  #left-side {
    padding: 20px;
    height: 100vh;
    min-height: 600px;
    display: flex;
    flex-direction: column;
    @media (max-width: 991px) {
      height: calc(100vh - 300px);
      align-items: center;
      justify-content: center;
    }
    .articles {
      top: 0px;
      position: relative;
      height: 350px;
      display: flex;
      margin-top: auto;
      top: -20%;
      @media (max-width: 991px) {
        top: 0px;
        margin-top: 25px;
      }
      article {
        top: 0px;
        position: absolute;
        align-content: center;
        transform: translateX(-10)px;
        padding-bottom: 20px;
        .article_headline {
          margin-top: 50px;
        }
        .article_paragraph {
          margin: 50px 0px;
        }
      }

      #articles_selector_bars {
        height: 4px;
        width: auto;
        margin-top: auto;
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
    }
  }

  #right-side {
    padding: 0px;
    position: relative;
    @media (max-width: 991px) {
      min-height: 400px;
      height: 50vh;
      padding-top: 25px;
      overflow-y: hidden;
    }
    .right-side_component {
      position: absolute;
      transform: translateX(100%);
      z-index: 0;
      transition: transform .5s cubic-bezier(.55,.62,.36,.34);
      @media (max-width: 991px) {
        transform: translateY(100%);
      }
      &.right-side_component--show {
        transform: translate(0%);
        z-index: 1;
      }
    }
  }

  .translate-article-right-enter-active {
    transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1) 0.9s;
    transform: translateX(0px);
  }
  .translate-article-right-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .translate-article-right-enter, .translate-article-right-leave-to
    /* .translate-article-right-leave-active below version 2.1.8 */ {
    transform: translateX(-10px);
    opacity: 0;
  }

  .translate-article-left-enter-active {
    transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1) 0.9s;
    transform: translateX(0px);
  }
  .translate-article-left-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .translate-article-left-enter, .translate-article-left-leave-to
    /* .translate-article-left-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
}
</style>
