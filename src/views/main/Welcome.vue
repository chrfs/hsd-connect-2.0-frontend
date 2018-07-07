<template>
  <section class="container-fluid">
    <main class="row">
      <div id="left-side" class="col-12 col-lg-6 offset-lg-1 min-height-100vh">
        <WelcomeHeader @changeComponent="changeComponent"></WelcomeHeader>
        <div class="articles">
          <transition-group :name="'translate-article-'+articles.slideDirection" tag="div" mode="out-in">
              <article class="row" v-show="articleIndex === articles.activeArticleIndex" v-for="(article, articleIndex) in articles.entries" v-bind:key="articleIndex">
                <div class="col-12">
                  <h2 class="article__headline" v-html="article.title"></h2>
                  <p class="article__paragraph" v-html="article.message"></p>
                </div>
              </article>
          </transition-group>
            <div id="articles__selector__bars">
              <span class="articles__selector__bar" v-for="(articleBar, articleBarIndex) in articles.entries" :style="{left: ((articles.articleBarIndex)*articles.selectorBarWidth) + 'px', width: articles.selectorBarWidth+'px'}" v-bind:key="articleBarIndex"></span>
              <span class="articles__selector__bar article-active" :style="{transform: 'translateX('+((articles.activeArticleIndex)*articles.selectorBarWidth) + 'px)', width: articles.selectorBarWidth+'px'}"></span>
            </div>
        </div>
      </div>
        <div id="right-side" class="col-12 col-lg-5">
          <WelcomeIntro @changeComponent="changeComponent" :isActive="this.currentComponent === 'WelcomeIntro'" class="right-side__component" :class="{'right-side__component--show': this.currentComponent === 'WelcomeIntro'}" :key="'Intro'"></WelcomeIntro>
          <WelcomeRegister @changeComponent="changeComponent" :isActive="this.currentComponent === 'WelcomeRegister'" class="right-side__component" :class="{'right-side__component--show': this.currentComponent === 'WelcomeRegister'}" :key="'WelcomeRegister'"></WelcomeRegister>
          <WelcomeLogin @changeComponent="changeComponent" :isActive="this.currentComponent === 'WelcomeLogin'" class="right-side__component" :class="{'right-side__component--show': this.currentComponent === 'WelcomeLogin'}" :key="'WelcomeLogin'"></WelcomeLogin>
        </div>
    </main>
  </section>
</template>

<script>
import WelcomeHeader from '../../components/welcome/Header.vue'
import WelcomeIntro from '../../components/welcome/Intro.vue'
import WelcomeLogin from '../../components/welcome/Login.vue'
import WelcomeRegister from '../../components/welcome/Register.vue'

export default {
  data: () => {
    return {
      articles: {
        entries: [
          {
            title: 'Projekte zusammen<br><span class="red-colored">meistern</span>',
            message: 'Setze deine Hochschulprojekte mit Studierenden aus anderen Fachbereichen gemeinsam um.<br> Poste jetzt dein Projekt!'
          },
          {
            title: 'Second Article',
            message: 'lorem ipsum..'
          },
          {
            title: 'Third Article',
            message: 'Setze deine Hochschulprojekte mit Studierenden aus anderen Fachbereichen gemeinsam um.<br> Poste jetzt dein Projekt!'
          },
          {
            title: 'Fourth Article',
            message: 'Setze deine Hochschulprojekte mit Studierenden aus anderen Fachbereichen gemeinsam um.<br> Poste jetzt dein Projekt!'
          },
          {
            title: 'Fifth Article',
            message: 'Setze deine Hochschulprojekte mit Studierenden aus anderen Fachbereichen gemeinsam um.<br> Poste jetzt dein Projekt!'
          }
        ],
        activeArticleIndex: 0,
        selectorBarWidth: 50,
        slideDirection: 'right'
      },
      currentComponent: 'WelcomeIntro'
    }
  },
  computed: {},
  methods: {
    showArticle (articleIndex) {
      this.articles.slideDirection =
        articleIndex > this.articles.activeArticleIndex ? 'right' : 'left'
      this.articles.activeArticleIndex = articleIndex
    },
    changeComponent (nextComponent) {
      this.currentComponent = nextComponent
    }
  },
  mounted () {
    setInterval(() => {
      const nextSlide =
        this.articles.activeArticleIndex + 1 >= this.articles.entries.length
          ? 0
          : this.articles.activeArticleIndex + 1
      this.showArticle(nextSlide)
    }, 4000)
  },
  components: { WelcomeHeader, WelcomeIntro, WelcomeRegister, WelcomeLogin }
}
</script>

<style lang="scss" scoped>
section {
  height: 100vh;
  min-height: 800px;
  #left-side {
    padding: 20px;
    height: 100vh;
    min-height: 500px;
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
        .article__headline {
          margin-top: 50px;
        }
        .article__paragraph {
          margin: 50px 0px;
        }
      }

      #articles__selector__bars {
        height: 4px;
        width: auto;
        margin-top: auto;
        .articles__selector__bar {
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
    .right-side__component {
      position: absolute;
      transform: translateX(100%);
      z-index: 0;
      transition: transform .5s cubic-bezier(.55,.62,.36,.34);
      @media (max-width: 991px) {
        transform: translateY(100%);
      }
      &.right-side__component--show {
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
