<template>
  <section class="container-split">
    <Navigation></Navigation>
    <main class="right-view">
      <h2>Projekt anlegen</h2>
      <FormGenerator class="form" identifier="project-create" @submit="postNewProject" :fields="fields"></FormGenerator>
    </main>
  </section>
</template>

<script>
import Navigation from '../components/Navigation.vue'
import FormGenerator from '../components/FormGenerator'

export default {
  data: () => {
    return {
      fields: {
        notification: {},
        title: {
          elementType: 'input',
          inputType: 'text',
          label: 'Title',
          isRequired: true
        },
        description: {
          elementType: 'textarea',
          label: 'Description',
          isRequired: true
        },
        images: {
          elementType: 'input',
          inputType: 'file',
          label: 'Bilder hochladen',
          isRequired: false
        },
        searchingParticipants: {
          elementType: 'input',
          inputType: 'checkbox',
          label: 'Suche Mitglieder'
        },
        submit: {
          elementType: 'input',
          inputType: 'submit',
          value: 'Projekt erstellen'
        }
      }
    }
  },
  methods: {
    postNewProject (user) {
      this.resetFormFieldMessages()
      this.$http.post(this.$httpRoutes.POST_LOGIN, user).then(({ data: { data } }) => {
        // TODO: SET NOTIFICATION
        this.resetFormFieldValues()
        this.$router.go('/')
        this.$store.dispatch('user/setAuthToken', data.authToken)
        this.$store.dispatch('user/setUser', data.user)
      }).catch((res) => {
        const response = res.response
        if (!response || !response.data || response.data.status >= 500) {
          this.fields.newProject.message = 'An unexpected error has occurred.'
          return
        }
        const data = response.data
        if (data.data) {
          this.fields.newProject.message = data.data
        } else if (data.errors) {
          Object.keys(data.errors).forEach(entry => {
            this.fields[entry].message = data.errors[entry]
          })
        }
      })
    },
    resetFormFieldMessages () {
      Object.keys(this.fields).forEach(entry => {
        this.fields[entry].message = ''
      })
    },
    resetFormFieldValues () {
      Object.keys(this.fields).forEach(entry => {
        this.fields[entry].value = ''
      })
    }
  },
  components: { Navigation, FormGenerator }
}

</script>

<style lang="scss">
</style>
