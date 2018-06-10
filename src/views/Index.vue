<template>
  <section class="container-fluid">
    <main class="row">
      <div class="col-12 col-md-7 col-lg-6 offset-lg-1 min-height-100vh">
       <WelcomeHeader></WelcomeHeader>
        <transition-group :name="'translate-in-out-'+articleSlideDirection" mode="out-in">
          <article class="row" v-show="article.active" v-for="(article, articleIndex) in articles" v-bind:key="articleIndex">
            <div class="col-12">
              <h1 class="article__headline" v-html="article.title"></h1>
              <p class="article__paragraph" v-html="article.message"></p>
            </div>
          </article>
        </transition-group>
        <div id="articles__selector">
          <div id="articles__selector__bars">
            <span class="articles__selector__bar article-active" :style="{transform: 'translateX('+((activeArticleIndex)*articleBarWidth) + 'px)', width: articleBarWidth+'px'}"></span>
            <span class="articles__selector__bar" v-for="(articleBar, articleBarIndex) in articles" :style="{left: ((articleBarIndex)*articleBarWidth) + 'px', width: articleBarWidth+'px'}" v-bind:key="articleBarIndex"></span>
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
      articleSlideDirection: 'Right'
    };
  },
  computed: {},
  methods: {
    showArticle: function(articleIndex){
      this.articleSlideDirection = articleIndex > this.activeArticleIndex ? 'right' : 'left';
      console.log(this.articleSlideDirection);
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
  article {
    align-content: center;
    position: absolute;
    bottom: 20%;
    transform: translateX(-10);
    .article__headline {
      margin-bottom: 100px;
    }
    .article__paragraph {
      margin-bottom: 20px;
    }
  }

  #articles__selector {
      position: absolute;
      bottom: 20%;
    #articles__selector__bars {
      position: relative;
      .articles__selector__bar {
        background: #f2f2f2;
        height: 4px;
        display: inline-block;
        position: absolute;
      }
      .article-active {
        background: #e40529;
        position: absolute;
        z-index: 1;
        transition: transform .4s cubic-bezier(.12,.41,.27,.16);
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
      min-height: 50vh;
      left: 75px;
    }

    #lets-connect__button{
      position: absolute;
      bottom: 20%;
      transform: translateX(-50%);
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
</style>
