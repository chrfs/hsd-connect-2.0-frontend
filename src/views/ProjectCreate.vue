<template>
  <section class="container-split">
    <Navigation></Navigation>
    <main class="right-view">
      <h2>Projekt anlegen</h2>
      <FormGenerator class="form" @updateForm="updateForm" identifier="project-create" @submit="postNewProject" :fields="fields"></FormGenerator>
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
          label: 'Bilder hochladen (max. 4 Bilder / 3 mb)',
          isRequired: false,
          fileInput: {
            maxQuantity: 4,
            acceptedTypes: [
              'image/jpeg',
              'image/gif',
              'image/webp',
              'image/png'
            ],
            maxSize: 3e+6 // 3mb
          }
        },
        searchingParticipants: {
          elementType: 'input',
          inputType: 'checkbox',
          label: 'Suche Mitglieder',
          style: {
            display: 'inline'
          }
        },
        submit: {
          elementType: 'input',
          inputType: 'submit',
          value: 'Absenden',
          noFormData: true
        }
      }
    }
  },
  methods: {
    postNewProject (project) {
      this.resetFormFieldMessages()
      this.$http.post(this.$httpRoutes.POST_PROJECT, project).then(({ data: { data } }) => {
        // TODO: SET NOTIFICATION
        this.updateForm()
      }).catch((res) => {
        const response = res.response
        if (!response || !response.data || response.data.status >= 500) {
          this.fields.notification.message = 'An unexpected error has occurred.'
          this.$store.dispatch('user/setAuthToken', null)
          return
        }
        const data = response.data
        if (data.data) {
          // TODO: SET NOTIFICATION
          this.$router.push('/')
        } else if (data.errors) {
          Object.keys(data.errors).forEach(entry => {
            this.fields[entry].message = data.errors[entry]
          })
          this.updateForm()
        }
      })
    },
    updateForm () {
      const fields = JSON.parse(JSON.stringify(this.fields))
      this.fields = {}
      this.$nextTick(function () {
        this.fields = JSON.parse(JSON.stringify(fields))
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
