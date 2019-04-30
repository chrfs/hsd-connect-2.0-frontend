<template>
  <form :id="identifier + '-form'" @submit="submit" autocomplete="off">
    <fieldset v-for="(field, fieldName, fieldIndex) in fields" :key="fieldName + '-' + fieldIndex">
      <label v-if="field.label" :style="field.style"> {{ field.label }}: </label>
      <input
        v-if="isInputElement(field) && !isFileInputType(field)"
        :name="field.label + fieldIndex"
        :type="field.inputType"
        :style="field.style"
        :class="{ button: isSubmitInputType(field) }"
        v-model="field.value"
        autocomplete="off"
        :required="field.isRequired === true"
      />
      <label
        v-if="isInputElement(field) && isFileInputType(field)"
        class="fileupload__container"
        :class="{ 'is-dragging': dragging }"
        @drop="startFileUpload($event, fieldName)"
        @dragover.prevent
        @dragenter="dragging = true"
        @dragend="dragging = false"
        @dragleave="dragging = false"
        :for="fieldName + '-' + fieldIndex + '-fileupload'"
      >
        <input
          :name="field.label + fieldIndex"
          v-show="false"
          :accept="field.fileInput.acceptedTypes"
          :id="fieldName + '-' + fieldIndex + '-fileupload'"
          :type="field.inputType"
          @change="startFileUpload($event, fieldName)"
          :multiple="field.fileInput.maxQuantity > 1"
          :required="field.isRequired === true"
        />
        <div class="fileupload__hint">
          <font-awesome-icon class="fileupload__background-icon fa-icon" icon="cloud-upload-alt"></font-awesome-icon>
          <p>
            Klicke oder ziehe Deine Dateien per Drag&amp;Drop hier rein.<br />(Akzeptierte Dateiformate
            {{ field.fileInput.acceptedTypes.join(', ') }}
          </p>
        </div>
        <div class="fileupload__background"></div>
        <draggable class="fileupload" :list="field.value" @change="$emit('updateFields')">
          <div class="file" v-for="file in field.value" :key="file.name">
            <font-awesome-icon
              class="file__delete border-round fa-icon"
              @click="deleteFile($event, fieldName, file.name)"
              icon="times-circle"
            ></font-awesome-icon>
            <div class="file__img" @click="$event.preventDefault()">
              <img :src="file.data || getImageURL(file.token)" :alt="file.name" draggable />
            </div>
            <p class="file__info">{{ file.name }} <br />({{ getFileSize(file.size) }})</p>
          </div>
        </draggable>
      </label>
      <textarea spellcheck="false" v-if="isTextareaElement(field)" v-model="field.value" :required="field.isRequired"></textarea>
      <span>{{ isTextareaElement(field) ? field.value.length + ' Zeichen' : '' }}</span>
      <p class="text--error" v-text="field.message"></p>
    </fieldset>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import draggable from 'vuedraggable';

export default Vue.extend({
  data: () => ({
    newFile: '',
    dragging: false,
    loadingFiles: true
  }),
  watch: {
    fieldValues() {
      this.setFieldValues();
    }
  },
  methods: {
    isInputElement(field: any) {
      return field.elementType === 'input';
    },
    isTextareaElement(field: any) {
      return field.elementType === 'textarea';
    },
    isSubmitInputType(field: any) {
      return field.inputType === 'submit';
    },
    isFileInputType(field: any) {
      return field.inputType === 'file';
    },
    isCheckboxInputType(field: any) {
      return field.inputType === 'checkbox';
    },
    prepareFields() {
      Object.keys(this.fields).forEach(fieldName => {
        const field = this.fields[fieldName];
        field.message = '';
        if (field.value) {
          return;
        }
        switch (field.elementType) {
          case 'input': {
            switch (field.inputType) {
              case 'file': {
                field.value = [];
                break;
              }
              case 'text': {
                field.value = '';
                break;
              }
              default: {
                break;
              }
            }
            break;
          }
          case 'textarea': {
            field.value = '';
            break;
          }
          default: {
            break;
          }
        }
      });
    },
    submit(event: Event) {
      event.preventDefault();
      event.stopPropagation();
      const formData = this.getFormData();
      this.$emit('submit', formData);
    },
    getImageURL(imageToken: string) {
      if (!imageToken) {
        return 'https://via.placeholder.com/370x200';
      }
      return `${(this as any).$APIHost}/projects/${this.fieldValues._id}/images/${imageToken}`;
    },
    setFieldValues() {
      Object.keys(this.fields).forEach(fieldName => {
        if (this.fieldValues[fieldName]) {
          const field = this.fields[fieldName];
          field.value = this.fieldValues[fieldName];
        }
      });
      this.$emit('updateFields');
    },
    getFileName(fileName = '', len = 5) {
      const ext = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length).toLowerCase();
      let newFileName = fileName.replace(`.${ext}`, '').replace(/[^a-z0-9]|\s+|\r?\n|\r/gim, '');
      newFileName = newFileName.length >= len
        ? newFileName : Math.random()
          .toString(36)
          .substring(len);
      newFileName = `${newFileName.substr(0, len)}${new Date().getTime()}.ext`;
      return newFileName.toLowerCase();
    },
    getFileSize(bytes: number, decimals: number) {
      if (bytes === 0) {
        return '0 Bytes';
      }
      const k = 1024;
      const dm = decimals <= 0 ? 0 : decimals || 2;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${Number.parseFloat((bytes / (k ** i)).toFixed(dm))} ${sizes[i]}`;
    },
    startFileUpload(event: Event, fieldName: string) {
      event.preventDefault();
      if ((event.target as any).complete) {
        return;
      }
      this.processFileUpload(Array.from((event.target as any).files || ((event as any).dataTransfer as any).files), fieldName);
    },
    checkFilesizes(fieldName: string, newFile: any) {
      const field = this.fields[fieldName];
      const currentFileSize = field.value.reduce((acc: number, file: any) => acc + file.size, 0);
      return currentFileSize + newFile.size < field.fileInput.maxSize;
    },
    processFileUpload(files: any[], fieldName: string) {
      const field = this.fields[fieldName];
      field.message = '';
      const file = files.shift();
      if (!file) {
        this.$emit('updateFields');
        return;
      }
      const reader: FileReader = new FileReader();
      (reader as any).onloadend = (e: Event & { target: { result: string } }) => {
        if (!e || !e.target) {
          return;
        }
        const { fileInput } = field;

        const quantityCheck = field.value.length + 1 <= fileInput.maxQuantity;
        const typeCheck = fileInput.acceptedTypes.includes(file.type);
        const sizeCheck = this.checkFilesizes(fieldName, file);
        if (quantityCheck && typeCheck && sizeCheck) {
          const newFile = {
            name: this.getFileName(file.name),
            mime: file.type ? file.type : 'Unknown/Extension missing',
            data: e.target.result,
            size: file.size
          };
          field.value.push(newFile);
        } else if (!sizeCheck) {
          field.message = 'Image has not been loaded, filesize is to big.';
        } else if (!typeCheck) {
          field.message = 'Image has not been loaded, filetype is not supported.';
        } else if (!quantityCheck) {
          field.message = 'Image has not been loaded, maximum file quantity is reached.';
        }

        this.dragging = false;
        this.processFileUpload(files, fieldName);
      };
      reader.readAsDataURL(file);
    },
    deleteFile(event: Event, fieldName: string, fileName: string) {
      event.preventDefault();
      this.fields[fieldName].value = this.fields[fieldName].value.filter((file: any) => file.name !== fileName);
      this.$emit('updateFields');
    },
    getFormData() {
      const formData = Object.keys(this.fields).reduce((acc: any, fieldName: string) => {
        const { value: fieldValue, noFormData } = this.fields[fieldName];
        if (!fieldValue || noFormData) {
          return acc;
        }
        acc[fieldName] = fieldValue;
        return acc;
      }, {});
      return formData;
    }
  },
  props: ['identifier', 'fields', 'fieldValues'],
  components: { draggable },
  beforeMount() {
    this.prepareFields();
  }
});
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';

.fileupload__container {
  position: relative;
  margin: 0px;
  &.is-dragging {
    .fileupload__background {
      background: $baseLighBlue;
      border-width: 2px;
    }
  }
  .fileupload__background {
    transition: background 0.3s ease-in-out;
    background: $baseLightGrey;
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: inherit;
    z-index: 0;
    opacity: 0.3;
    height: inherit;
    cursor: pointer;
  }
  .fileupload__hint {
    text-transform: none;
    width: 50%;
    position: absolute;
    z-index: -1;
    top: 50%;
    left: 50%;
    opacity: 0.5;
    transform: translate(-50%, -50%);
    text-align: center;
    .fileupload__background-icon {
      height: 75px;
      width: 75px;
      margin: auto;
    }
  }
  .fileupload {
    height: 200px;
    width: 100%;
    overflow: auto;
    background: transparent;
    border-radius: 2px;
    border: 1px dashed #{$baseBlue};
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    &:active {
      cursor: grabbing;
    }
    .file {
      margin: 25px 10px;
      z-index: 0;
      position: relative;
      width: 175px;
      height: 75px;
      cursor: move;
      cursor: grab;
      &:active {
        cursor: grabbing;
      }
      .file__img {
        width: inherit;
        height: inherit;
        overflow: hidden;
        img {
          width: inherit;
          min-height: inherit;
        }
      }
      .file__delete {
        position: absolute;
        top: 5px;
        right: 0px;
        color: black;
        cursor: pointer;
        border: 1px solid white;
        background: $baseWhite;
      }
      .file__info {
        font-family: 'Montserrat-Medium';
      }
    }
  }
}
</style>
