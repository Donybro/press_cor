<template>
  <form>
    <label for='file-upload' class='licence'>
      {{ title }}
      <img v-if='logo==="cloud"' src='../assets/icons/upload_licence.svg' alt=''>
      <img v-if='logo==="download"' src='../assets/icons/download.svg' alt=''>
    </label>
    <input @change='inputFileHandler2' ref='fileInputLicense' id='file-upload' type='file' />
  </form>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'License',
  props: ['title', 'logo'],
  data() {
    return {
      licence: null,
    };
  },
  validations: {
    licence: { required },
  },
  methods: {
    inputFileHandler2() {
      let { type } = this.$refs.fileInputLicense.files['0'];
      if (type === 'application/pdf' || type === 'image/jpeg') {
        const formData = new FormData();
        formData.append('file', this.$refs.fileInputLicense.files['0']);
        this.$emit('license-seted', formData);
      }
    },
  },
};
</script>

<style scoped lang='scss'>
.licence {
  font-size: 22px;
  line-height: 26px;
  color: #0058BF;
  cursor: pointer;
  display: flex;
  position: relative;

  img {
    margin-left: 10px;
  }
}

input[type="file"] {
  display: none;
}

.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  cursor: pointer;
}
</style>