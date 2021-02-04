<template>
  <form>
    <label for='photo-upload' class='licence'>
      {{ title }}
      <img src='../assets/icons/upload_licence.svg' alt=''>
    </label>
    <input @change='inputFileHandler2' ref='uploadedPhoto' id='photo-upload' type='file' />
  </form>
</template>

<script>
export default {
  name: 'UploadPhoto',
  props: ['title'],
  methods: {
    inputFileHandler2() {
      let { type } = this.$refs.uploadedPhoto.files['0'];
      if (type === 'application/pdf' || type === 'image/jpeg') {
        const formData = new FormData();
        formData.append('file', this.$refs.uploadedPhoto.files['0']);
        this.$emit('photo-seted', formData);
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