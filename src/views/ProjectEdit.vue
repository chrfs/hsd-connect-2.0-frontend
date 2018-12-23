<template>
  <section class="container-split">
    <Navigation></Navigation>
    <main class="right-view">
      <h2>Projekt bearbeiten</h2>
      <FormGenerator class="form" @updateFields="updateFields" identifier="project-edit" @submit="updateProject" :fieldValues="project" :fields="fields"></FormGenerator>
    </main>
  </section>
</template>

<script>
import Navigation from '../components/Navigation.vue'
import FormGenerator from '../components/FormGenerator'

export default {
  data: () => {
    return {
      project: null,
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
          label: 'Bilder hochladen (max. 4 Bilder / 3 MB)',
          isRequired: false,
          external: true,
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
    updateFields (fields) {
      const currentFields = JSON.parse(JSON.stringify(fields || this.fields))
      this.fields = {}
      this.$nextTick(function () {
        this.fields = JSON.parse(JSON.stringify(currentFields))
      })
    },
    updateProject (project) {
      this.resetFormFieldMessages()
      this.$http.put('/projects/' + this.$route.params.id, project).then(({ data: { data } }) => {
        // TODO: SET NOTIFICATION
        this.updateFields()
        this.$router.push('/')
      }).catch((res) => {
        const response = res.response
        if (!response || !response.data || response.data.status >= 500) {
          // this.fields.notification.message = 'An unexpected error has occurred.'
          // this.$store.dispatch('user/setAuthToken', null)
          return
        }
        const data = response.data
        if (data.data) {
          // TODO: SET NOTIFICATION
        } else if (data.errors) {
          Object.keys(data.errors).forEach(entry => {
            this.fields[entry].message = data.errors[entry]
          })
          this.updateFields()
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
    },
    fetchProject () {
      this.$http.get('/projects/' + this.$route.params.id, { pageId: this.pageId }).then(({data: { data }}) => {
        this.project = data
      }).catch((res) => {
        const response = res.response
        if (!response || !response.data || response.data.status >= 500) {
          // this.$store.dispatch('user/setAuthToken', null)
          return
        }
        const data = response.data
        if (data.errors) {
          Object.keys(data.errors).forEach(entry => {
            this.fields[entry].message = data.errors[entry]
          })
        }
      })
    }
  },
  mounted () {
    this.fetchProject()
  },
  components: { Navigation, FormGenerator }
}

</script>

<style lang="scss">
</style>
