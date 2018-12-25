 <template>
  <form :id="identifier+'-form'" @submit="submit" autocomplete="off">
    <fieldset v-for="(field, fieldName, fieldIndex) in fields" :key="fieldName+'-'+fieldIndex">
      <label v-if="field.label" :style="field.style">
        {{field.label}}:
      </label>
      <input v-if="isInputElement(field) && !isFileInputType(field)" :name="field.label+fieldIndex" :type="field.inputType" :style="field.style" :class="{'button': isSubmitInputType(field)}" v-model="field.value" autocomplete="off" :required="field.isRequired === true">
      <label v-if="isInputElement(field) && isFileInputType(field)" class="fileupload__container"  :class="{'is-dragging': dragging}" @drop="startFileUpload($event, fieldName)" @dragover.prevent @dragenter="dragging=true" @dragend="dragging=false" @dragleave="dragging=false" :for="fieldName+'-'+fieldIndex+'-fileupload'">
        <input :name="field.label+fieldIndex" v-show="false" :accept="field.fileInput.acceptedTypes" :id="fieldName+'-'+fieldIndex+'-fileupload'" :type="field.inputType" @change="startFileUpload($event, fieldName)" :multiple="field.fileQuantity > 1" :required="field.isRequired === true">
        <div class="fileupload__hint">
          <font-awesome-icon class="fileupload__background-icon fa-icon" icon="cloud-upload-alt"></font-awesome-icon>
          <p>Klicke oder ziehe Deine Dateien per Drag&amp;Drop hier rein.<br>(Akzeptierte Dateiformate {{field.fileInput.acceptedTypes.join(', ')}}</p>
        </div>
        <div class="fileupload__background">
        </div>
        <draggable class="fileupload" :list="field.value" @change="$emit('updateForm')">
          <div class="file" v-for="file in field.value" @click="deleteFile($event, fieldName, file.name)" :key="file.name">
          <font-awesome-icon class="file__delete border-round fa-icon" icon="times-circle"></font-awesome-icon>
            <div class="file__img">
              <img :src="file.data || getImageURL(file.token)" :alt="file.name" draggable>
            </div>
            <p class="file__info">{{file.name}} <br>({{getFileSize(file.size)}})</p>
          </div>
        </draggable>
      </label>
      <textarea v-if="isTextareaElement(field)" v-model="field.value" :required="field.isRequired"></textarea>
      <p class="text--error" v-text="field.message"></p>
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
  watch: {
    fieldValues: function () {
      this.setFieldValues()
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
    getImageURL (imageToken) {
      if (!imageToken) return 'https://via.placeholder.com/370x200'
      return `${this.$APIHost}/projects/${this.fieldValues._id}/images/${imageToken}`
    },
    setFieldValues () {
      Object.keys(this.fields).forEach(fieldName => {
        if (this.fieldValues[fieldName]) {
          const field = this.fields[fieldName]
          field.value = this.fieldValues[fieldName]
        }
      })
      this.$emit('updateForm')
    },
    getFileName (fileName = '', len = 5) {
      const ext = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length).toLowerCase()
      let newFileName = fileName.replace('.' + ext, '').replace(/[^a-z0-9]|\s+|\r?\n|\r/gmi, '')
      newFileName = newFileName.length >= len ? newFileName : Math.random().toString(36).substring(len)
      newFileName = newFileName.substr(0, len) + new Date().getTime() + '.' + ext
      return newFileName.toLowerCase()
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
            name: this.getFileName(file.name),
            mime: file.type ? file.type : 'Unknown/Extension missing',
            data: e.target.result,
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
    deleteFile (event, fieldName, fileName) {
      event.preventDefault()
      this.fields[fieldName].value = this.fields[fieldName].value.filter(file => file.name !== fileName)
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
  props: ['identifier', 'fields', 'fieldValues'],
  components: { draggable },
  beforeMount () {
    this.prepareFields()
  }
}
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
    transition: background .3s ease-in-out;
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
        background: white;
      }
      .file__info {
        font-family: "Montserrat-Medium"
      }
    }
  }
}
</style>
