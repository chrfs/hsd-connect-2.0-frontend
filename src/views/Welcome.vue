<template>
  <main>
    <div class="welcome__left">
      <WelcomeHeader></WelcomeHeader>
      <div class="article__slider">
        <div class="article">
          <transition-group :name="'translate-article-' + slider.activeSlideDirection" mode="out-in">
            <article
              v-show="articleIndex === slider.activeIndex"
              v-for="(article, articleIndex) in slider.articles"
              v-bind:key="article.title + articleIndex"
            >
              <h2 class="article__headline" v-html="article.title"></h2>
              <p class="article_paragraph" v-html="article.description"></p>
            </article>
          </transition-group>
          <div id="articles__selector-bars">
            <span
              class="articles__selector-bar"
              v-for="(articleBar, articleBarIndex) in slider.articles"
              :style="{
                left: slider.articleBarIndex * slider.activeBarWidth + 'px',
                width: slider.activeBarWidth + 'px'
              }"
              v-bind:key="articleBarIndex"
            ></span>
            <span
              class="articles__selector-bar article--active"
              :style="{
                transform: 'translateX(' + slider.activeIndex * slider.activeBarWidth + 'px)',
                width: slider.activeBarWidth + 'px'
              }"
            ></span>
          </div>
        </div>
      </div>
    </div>
    <aside class="welcome__right">
      <WelcomeIndex class="welcome__component" :class="{ 'welcome__component--show': isActiveComponent('WelcomeIndex') }">
      </WelcomeIndex>
      <WelcomeSignInUp
        :isSignUp="true"
        class="welcome__component"
        :class="{ 'welcome__component--show': isActiveComponent('WelcomeSignUp') }"
        :isActive="true"
      ></WelcomeSignInUp>
      <WelcomeSignInUp
        :isSignIn="true"
        class="welcome__component"
        :class="{ 'welcome__component--show': isActiveComponent('WelcomeSignIn') }"
        :isActive="true"
      ></WelcomeSignInUp>
      <WelcomeAbout class="welcome__component" :class="{ 'welcome__component--show': isActiveComponent('WelcomeAbout') }">
      </WelcomeAbout>
    </aside>
  </main>
</template>

<script>
import WelcomeAbout from '../components/Welcome/About.vue';
import WelcomeHeader from '../components/Welcome/Header.vue';
import WelcomeIndex from '../components/Welcome/Index.vue';
import WelcomeSignInUp from '../components/Welcome/SignInUp.vue';

export default {
  data: () => ({
    slider: {
      articles: [
        {
          title: 'Projekte zusammen <span class="red-colored">meistern</span>',
          description: `Gemeinsam an einem Strang ziehen und Projekte erfolgreich beenden!
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
            labore et dolore magna aliqua.+ Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
             aliquip ex ea commodo consequat.`
        },
        {
          title: 'Gemeinsam an Aufgaben <span class="red-colored">wachsen</span>',
          description: `Gemeinsam an einem Strang ziehen und Projekte erfolgreich beenden!
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
            labore et dolore magna aliqua.+ Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
             aliquip ex ea commodo consequat.`
        },
        {
          title: 'Erfahrungen <span class="red-colored">austauschen</span>',
          description: `Gemeinsam an einem Strang ziehen und Projekte erfolgreich beenden!
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
            labore et dolore magna aliqua.+ Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
             aliquip ex ea commodo consequat.`
        },
        {
          title: 'Studierende besser <span class="red-colored">kennenlernen</span>',
          description: `Gemeinsam an einem Strang ziehen und Projekte erfolgreich beenden!
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
            labore et dolore magna aliqua.+ Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
             aliquip ex ea commodo consequat.`
        },
        {
          title: 'Ziele <span class="red-colored">erreichen</span>',
          description: `Gemeinsam an einem Strang ziehen und Projekte erfolgreich beenden!
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
            labore et dolore magna aliqua.+ Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
             aliquip ex ea commodo consequat.`
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
  }),
  watch: {
    $route() {
      if (this.$route.path !== this.activeComponent.path) {
        this.setActiveComponent();
      }
    }
  },
  methods: {
    setActiveComponent() {
      this.activeComponent = {
        name: this.components[this.$route.path],
        path: this.$route.path
      };
    },
    changeComponent() {
      this.$router.push('/welcome/signin');
      window.scroll({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    },
    startSlider() {
      setInterval(() => {
        if (!document.hidden) {
          const nextSlide = this.slider.activeIndex + 1 >= this.slider.articles.length ? 0 : this.slider.activeIndex + 1;
          this.changeSlide(nextSlide);
        }
      }, 4000);
    },
    changeSlide(articleIndex) {
      this.slider.activeSlideDirection = articleIndex > this.slider.activeIndex ? 'right' : 'left';
      this.slider.activeIndex = articleIndex;
    },
    isActiveComponent(componentName) {
      return this.activeComponent.name === componentName;
    }
  },
  mounted() {
    this.setActiveComponent();
    this.startSlider();
  },
  components: {
    WelcomeHeader,
    WelcomeIndex,
    WelcomeSignInUp,
    WelcomeAbout
  }
};
</script>

<style lang="scss">
@import '../assets/scss/variables';
main {
  display: grid;
  grid-template-areas: 'left right';
  grid-template-columns: minmax(400px, 60%) minmax(400px, 40%);
  height: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  @media (max-width: 992px) {
    grid-template-areas: 'left' 'right';
    grid-template-rows: 1fr minmax(600px, 1fr);
    grid-template-columns: 1fr;
  }
  .welcome__left {
    display: grid;
    grid-area: left;
    /* autoprefixer: off */
    grid-template-areas: 'header' 'articles';
    grid-template-rows: 80px minmax(350px, 1fr);
    position: relative;
    padding: 20px 25px;
    flex-direction: column;
    .article__slider {
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
        @media (max-width: 992px) {
          height: 250px;
        }
        @media (max-width: 500px) {
          height: 300px;
        }
        .article__headline {
          font-size: 1.3em;
        }
      }
      #articles__selector-bars {
        height: 4px;
        // position: absolute;
        bottom: 10px;
        .articles__selector-bar {
          background: #f2f2f2;
          height: 4px;
          float: left;
        }
        .article--active {
          background: $baseRed;
          position: absolute;
          left: 0px;
          z-index: 1;
          transition: transform 1.2s cubic-bezier(0.12, 0.41, 0.27, 0.16);
        }
      }
    }
  }

  .welcome__right {
    padding: 0px;
    position: relative;
    grid-area: right;
    width: 40vw;
    min-width: 400px;
    @media (max-width: 992px) {
      overflow: hidden;
      height: 100vh;
      width: 100%;
    }
    .welcome__component {
      position: absolute;
      transform: translateX(100%);
      top: 0px;
      z-index: 0;
      transition: transform 0.5s cubic-bezier(0.55, 0.62, 0.36, 0.34);
      @media (max-width: 992px) {
        transform: translateY(100%);
      }
      &.welcome__component--show {
        transform: translate(0%);
        z-index: 1;
        @media (max-width: 992px) {
          transform: translate(0%);
        }
      }
    }
    .welcome__background {
      position: absolute;
      width: 100%;
      height: 100%;
      justify-content: center;
      background: $blueGradient;
      flex-direction: column;
      align-items: center;
      display: flex;
      @media (max-width: 991px) {
        transform: translateX(0px);
      }
    }
    .welcome__content {
      width: 320px;
      color: white;
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
  .translate-article-right-enter,
  .translate-article-right-leave-to {
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
  .translate-article-left-enter,
  .translate-article-left-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
}
</style>
