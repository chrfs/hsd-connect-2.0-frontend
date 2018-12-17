<template>
  <form :id="identifier+'-form'" @submit="submit">
    <fieldset v-for="(field, fieldName, fieldIndex) in fields" :key="fieldName+'-'+fieldIndex">
      <label v-if="field.label" :style="field.style">
        {{field.label}}:
      </label>
      <input v-if="isInputElement(field) && !isFileInputType(field)" :name="field.label+fieldIndex" :type="field.inputType" :style="field.style" :class="{'field-invalid': !!field.message, 'button': isSubmitInputType(field)}" v-model="field.value" autocomplete="on" :required="field.isRequired === true">
      <label v-if="isInputElement(field) && isFileInputType(field)" class="fileupload-container"  :class="{'is-dragging': dragging}" @drop="startFileUpload($event, fieldName)" @dragover.prevent @dragenter="dragging=true" @dragend="dragging=false" @dragleave="dragging=false" :for="fieldName+'-'+fieldIndex+'-fileupload'">
        <input :name="field.label+fieldIndex" v-show="false" :accept="field.fileInput.acceptedTypes" :id="fieldName+'-'+fieldIndex+'-fileupload'" :type="field.inputType" @change="startFileUpload($event, fieldName)" :class="{'field-invalid': !!field.message}" :multiple="field.fileQuantity > 1" :required="field.isRequired === true">
        <div class="fileupload-hint">
          <font-awesome-icon class="fileupload-background-icon fa-icon" icon="cloud-upload-alt"></font-awesome-icon>
          <p>Klicke oder ziehe Deine Dateien per Drag&amp;Drop hier rein.<br>(Akzeptierte Dateiformate {{field.fileInput.acceptedTypes.join(', ')}})</p>
        </div>
        <div class="fileupload-background">
        </div>
        <draggable class="fileupload" :list="field.value" @change="$forceUpdate()">
          <div class="file" v-for="file in field.value" @click="deleteFileById($event, fieldName, file.id)" :key="file.id">
          <font-awesome-icon class="file-delete fa-icon" icon="times-circle"></font-awesome-icon>
            <img class="file-img" :src="file.data" :alt="file.name" draggable>
            <p class="file-info">{{getShortFileName(file.name)}} <br>({{file.formatedSize}})</p>
          </div>
        </draggable>
      </label>
      <textarea v-if="isTextareaElement(field)" :class="{'field-invalid': field.isValid}" v-model="field.value" :required="field.isRequired"></textarea>
      <p class="text-error" v-text="field.message"></p>
    </fieldset>
  </form>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  data: () => {
    return {
      newFile: '',
      dragging: false,
      loadingFiles: true
    }
  },
  methods: {
    isInputElement (field) {
      return field.elementType === 'input'
    },
    isTextareaElement (field) {
      return field.elementType === 'textarea'
    },
    isSubmitInputType (field) {
      return field.inputType === 'submit'
    },
    isFileInputType (field) {
      return field.inputType === 'file'
    },
    isCheckboxInputType (field) {
      return field.inputType === 'checkbox'
    },
    prepareFields () {
      this.fields.notification = {
        noFormData: true
      }
      Object.keys(this.fields).forEach(fieldName => {
        const field = this.fields[fieldName]
        field.message = ''
        if (field.value) {
          return
        }
        switch (field.elementType) {
          case 'input': {
            switch (field.inputType) {
              case 'file': {
                field.value = []
                break
              }
              case 'text': {
                field.value = ''
                break
              }
            }
            break
          }
          case 'textarea': {
            field.value = ''
          }
        }
      })
    },
    submit (event) {
      event.preventDefault()
      event.stopPropagation()
      const formData = this.getFormData()
      this.$emit('submit', formData)
    },
    getShortFileName (filename = '', len = 10) {
      const ext = filename.substring(filename.lastIndexOf('.') + 1, filename.length).toLowerCase()
      let newFilename = filename.replace('.' + ext, '')
      if (newFilename.length <= len) {
        return filename
      }
      newFilename = newFilename.substr(0, len) + (filename.length > len ? '[...]' : '')
      return newFilename + '.' + ext
    },
    getFileSize (bytes, decimals) {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const dm = decimals <= 0 ? 0 : decimals || 2
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
    },
    startFileUpload (event, fieldName) {
      event.preventDefault()
      if (event.target.complete) return
      this.processFileUpload(Array.from(event.target.files || event.dataTransfer.files), fieldName)
    },
    checkFilesizes (fieldName, newFile) {
      const field = this.fields[fieldName]
      const currentFileSize = field.value.reduce((acc, file) => {
        return (acc + file.size)
      }, 0)
      return (currentFileSize + newFile.size) < field.fileInput.maxSize
    },
    processFileUpload (files, fieldName) {
      const field = this.fields[fieldName]
      const file = files.shift()
      if (!file) {
        this.$emit('updateForm')
        return
      }
      const reader = new FileReader()
      reader.onloadend = (e) => {
        const fileInput = field.fileInput
        const quantityCheck = field.value.length + 1 <= fileInput.maxQuantity
        const typeCheck = fileInput.acceptedTypes.includes(file.type)
        const sizeCheck = this.checkFilesizes(fieldName, file)
        if (quantityCheck && typeCheck && sizeCheck) {
          const newFile = {
            id: (new Date().getTime()) + file.name.toLowerCase().replace(' ', '').replace(/[^a-zA-Z]/g, ''),
            name: file.name,
            type: file.type ? file.type : 'Unknown/Extension missing',
            data: e.target.result,
            formatedSize: this.getFileSize(file.size),
            size: file.size
          }
          field.value.push(newFile)
        } else {
          if (!sizeCheck) field.message = 'Image has not been loaded, filesize is to big.'
          else if (!typeCheck) field.message = 'Image has not been loaded, filetype is not supported.'
          else if (!quantityCheck) field.message = 'Image has not been loaded, maximum file quantity is reached.'
        }
        this.dragging = false
        this.processFileUpload(files, fieldName)
      }
      reader.readAsDataURL(file)
    },
    deleteFileById (event, fieldName, fileId) {
      event.preventDefault()
      this.fields[fieldName].value = this.fields[fieldName].value.filter(file => file.id !== fileId)
      this.$emit('updateForm')
    },
    getFormData () {
      const formData = Object.keys(this.fields).reduce((acc, fieldName) => {
        const fieldValue = this.fields[fieldName].value
        const noFormData = this.fields[fieldName].noFormData
        if (!fieldValue || noFormData) {
          return acc
        }
        acc[fieldName] = fieldValue
        return acc
      }, {})
      return formData
    }
  },
  props: ['identifier', 'isInactive', 'fields'],
  components: { draggable },
  beforeMount () {
    this.prepareFields()
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';

textarea {
  resize: vertical;
}

.fileupload-container {
  position: relative;
  margin: 0px;
  &.is-dragging {
    .fileupload-background {
      background: $baseLighBlue;
      border-width: 2px;
    }
  }
  .fileupload-background {
    transition: background .3s ease-in-out;
    background: $baseGreyBackground;
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
  .fileupload-hint {
    text-transform: none;
    width: 50%;
    position: absolute;
    z-index: -1;
    top: 50%;
    left: 50%;
    opacity: 0.5;
    transform: translate(-50%, -50%);
    text-align: center;
    .fileupload-background-icon {
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
      .file-img {
        width: inherit;
        height: inherit;
      }
      .file-delete {
        position: absolute;
        top: 5px;
        right: 0px;
        color: black;
        cursor: pointer;
        border: 1px solid $baseBlue;
        border-radius: 50%;
      }
      .file-info {
        font-family: "Montserrat-Medium"
      }
    }
  }
}
</style>
