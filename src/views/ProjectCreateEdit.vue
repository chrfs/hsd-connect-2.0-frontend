<template>
  <section class="container-split">
    <Navigation></Navigation>
    <main class="right-view">
      <h2>Projekt {{ formStatus === 'create' ? 'anlegen' : 'bearbeiten' }}</h2>
      <FormGenerator
        class="form"
        @updateFields="updateFields"
        :identifier="'project-' + formStatus"
        @submit="submit"
        :fieldValues="project"
        :fields="fields"
      ></FormGenerator>
    </main>
  </section>
</template>

<script>
import FormGenerator from '../components/FormGenerator.vue';
import Navigation from '../components/Navigation.vue';

export default {
  data: () => ({
    project: {},
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
          acceptedTypes: ['image/jpeg', 'image/gif', 'image/webp', 'image/png'],
          maxSize: 3e6 // 3mb
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
  }),
  computed: {
    formStatus() {
      return this.$route.meta.formStatus;
    }
  },
  methods: {
    updateFields(fields) {
      const currentFields = JSON.parse(JSON.stringify(fields || this.fields));
      this.fields = {};
      this.$nextTick(() => {
        this.fields = JSON.parse(JSON.stringify(currentFields));
      });
    },
    postNewProject(project) {
      this.resetFormFieldMessages();
      this.$http
        .post('/projects', project)
        .then(({ data: { data } }) => {
          // TODO: SET NOTIFICATION
          this.$router.push(`/projects/${data._id}`);
        })
        .catch(res => {
          const { response } = res;
          if (!response || !response.data || response.data.status >= 500) {
            // this.fields.notification.message = 'An unexpected error has occurred.'
            // this.$store.dispatch('user/setAuthToken', null)
            return;
          }
          const { data } = response;
          if (data.data) {
            // TODO: SET NOTIFICATION
            this.$router.push('/');
          } else if (data.errors) {
            Object.keys(data.errors).forEach(entry => {
              this.fields[entry].message = data.errors[entry];
            });
            this.updateFields();
          }
        });
    },
    updateProject(project) {
      this.resetFormFieldMessages();
      this.$http
        .put(`/projects/${this.$route.params.id}`, project)
        .then(({ data: { data } }) => {
          // TODO: SET NOTIFICATION
          this.updateFields();
          this.$router.push(`/projects/${this.$route.params.id}`);
        })
        .catch(res => {
          const { response } = res;
          if (!response || !response.data || response.data.status >= 500) {
            // TODO: SET NOTIFICATION
            // this.fields.notification.message = 'An unexpected error has occurred.'
            // this.$store.dispatch('user/setAuthToken', null)
            return;
          }
          const { data } = response;
          if (data.data) {
            // TODO: SET NOTIFICATION
          } else if (data.errors) {
            Object.keys(data.errors).forEach(entry => {
              this.fields[entry].message = data.errors[entry];
            });
            this.updateFields();
          }
        });
    },
    fetchProject() {
      this.$http
        .get(`/projects/${this.$route.params.id}`, { pageId: this.pageId })
        .then(({ data: { data } }) => {
          this.project = data;
        })
        .catch(res => {
          this.$router.push('/notfound');
        });
    },
    resetFormFieldMessages() {
      Object.keys(this.fields).forEach(entry => {
        this.fields[entry].message = '';
      });
    },
    resetFormFieldValues() {
      Object.keys(this.fields).forEach(entry => {
        this.fields[entry].value = '';
      });
    },
    submit(project) {
      if (this.formStatus === 'create') {
        this.postNewProject(project);
      } else {
        this.updateProject(project);
      }
    }
  },
  mounted() {
    if (this.formStatus === 'edit') {
      this.fetchProject();
    }
  },
  components: { Navigation, FormGenerator }
};
</script>

<style lang="scss"></style>
