<template>
  <section class="container-fluid">
    <main class="row">
      <div id="left-side" class="col-12 col-md-7 col-lg-6 offset-lg-1 min-height-100vh">
        <WelcomeHeader></WelcomeHeader>
        <div class="articles">
          <transition-group :name="'translate-in-out-'+articleSlideDirection" mode="out-in">
              <article class="row" v-show="article.active" v-for="(article, articleIndex) in articles" v-bind:key="articleIndex">
                <div class="col-12">
                  <h1 class="article__headline" v-html="article.title"></h1>
                  <p class="article__paragraph" v-html="article.message"></p>
                </div>
              </article>
          </transition-group>
            <div id="articles__selector__bars">
              <span class="articles__selector__bar" v-for="(articleBar, articleBarIndex) in articles" :style="{left: ((articleBarIndex)*articleBarWidth) + 'px', width: articleBarWidth+'px'}" v-bind:key="articleBarIndex"></span>
              <span class="articles__selector__bar article-active" :style="{transform: 'translateX('+((activeArticleIndex)*articleBarWidth) + 'px)', width: articleBarWidth+'px'}"></span>
            </div>
        </div>
      </div>
      <div id="lets-connect__symbol-background" class="col-12 col-lg-5 lets-connect min-height-100vh">
          <button id="lets-connect__button">Let's connect</button>
      </div>
    </main>
  </section>
</template>

<script>
import WelcomeHeader from '../components/WelcomeHeader.vue';

export default {
  data: () => {
    return {
      articles: [
        {
          title: 'Projekte zusammen<br><span class="red-colored">meistern</span>',
          message: 'Setze deine Hochschulprojekte mit Studierenden aus anderen Fachbereichen gemeinsam um.<br> Poste jetzt dein Projekt!',
          active: true
        },
       {
          title: 'Second Article',
          message: 'lorem ipsum..',
          active: false 
       },
       {
          title: 'Third Article',
          message: 'Setze deine Hochschulprojekte mit Studierenden aus anderen Fachbereichen gemeinsam um.<br> Poste jetzt dein Projekt!',
          active: false
        },
        {
          title: 'Fourth Article',
          message: 'Setze deine Hochschulprojekte mit Studierenden aus anderen Fachbereichen gemeinsam um.<br> Poste jetzt dein Projekt!',
          active: false
        },
        {
          title: 'Fifth Article',
          message: 'Setze deine Hochschulprojekte mit Studierenden aus anderen Fachbereichen gemeinsam um.<br> Poste jetzt dein Projekt!',
          active: false
        }
      ],
      activeArticleIndex: 0,
      articleBarWidth: 50,
      articleSlideDirection: 'right'
    };
  },
  computed: {},
  methods: {
    showArticle: function(articleIndex){
      this.articleSlideDirection = articleIndex > this.activeArticleIndex ? 'right' : 'left';
      this.articles[this.activeArticleIndex].active = false;
      this.activeArticleIndex = articleIndex;
      this.articles[articleIndex].active = true;
    }
  },
  mounted: function(){
    setInterval(() => {
        const nextSlide = this.activeArticleIndex+1 >= this.articles.length ? 0 : this.activeArticleIndex+1;
        this.showArticle(nextSlide);
    }, 4000);
  },
  components: { WelcomeHeader }
};
</script>

<style lang="scss" scoped>
  section{
    min-height: 100vh;
    #left-side {
        height: 100vh;
        min-height: 500px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        @media(max-width: 970px){
          height: calc(100vh - 300px);
        }
      .articles {
        top: 0px;
        position: relative;
        height: 300px;
        display: flex;
        article {
          top: 0px;
          position: absolute;
          align-content: center;
          transform: translateX(-10);
          padding-bottom: 20px;
          .article__headline {
            margin: 50px 0px;
          }
          .article__paragraph {
            margin-bottom: 80px;
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
            transition: transform 1.3s cubic-bezier(.12,.41,.27,.16);
          }
        }
      }
    }

    .lets-connect {
      background-color: #f2f2f2;
      position: relative;
      &#lets-connect__symbol-background{
        background-image: url('../assets/img/welcome/symbol_connect.svg');
        background-size: cover;
        position: relative;
        min-height: 300px;
        transform: translateX(75px);
        @media (max-width: 970px){
          transform: translateX(0px);
        }
      }

      #lets-connect__button{
        position: absolute;
        bottom: 20%;
        transform: translateX(-50%);
        @media (max-width: 970px){
          bottom: 100%;
          left: 50%;
          transform: translate(-50%, 50%);
        }
      }
    }

    .translate-in-out-right-enter-active {
      transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0) .9s;
      transform: translateX(0px);
    }
    .translate-in-out-right-leave-active {
      transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .translate-in-out-right-enter, .translate-in-out-right-leave-to
    /* .translate-in-out-right-leave-active below version 2.1.8 */ {
      transform: translateX(-10px);
      opacity: 0;
    }

    .translate-in-out-left-enter-active {
      transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0) .9s;
      transform: translateX(0px);
    }
    .translate-in-out-left-leave-active {
      transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .translate-in-out-left-enter, .translate-in-out-left-leave-to
    /* .translate-in-out-left-leave-active below version 2.1.8 */ {
      transform: translateX(10px);
      opacity: 0;
    }
  }
</style>
