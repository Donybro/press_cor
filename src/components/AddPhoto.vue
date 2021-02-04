<template>
  <form ref='form'>
    <label for='file-upload-photo' class='addphoto'>
      <img class='addPhoto' src='../assets/icons/addPhoto.svg'>
    </label>
    <input @change='inputFileHandler' ref='fileInput' id='file-upload-photo' type='file' />
  </form>
</template>

<script>
export default {
  name: 'AddPhoto',
  emits: ['photo-seted'],
  methods: {
    inputFileHandler() {
      let { type } = this.$refs.fileInput.files['0'];
      console.log(type);
      if (type === 'image/png' || type === 'image/jpeg') {
        const formData = new FormData();
        formData.append('file', this.$refs.fileInput.files['0']);
        this.$emit('photo-seted', formData);
      }
      // this.$refs.form.reset();
    },
  },
};
</script>

<style scoped lang='scss'>

input[type="file"] {
  display: none;
}

.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  cursor: pointer;
}

.addPhoto {
  position: absolute;
  bottom: 0;
  right: 10px;
  cursor: pointer;
}
</style>