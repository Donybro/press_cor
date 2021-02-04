<template>
  <div id='app'>
    <component :is='layout'></component>
  </div>
</template>

<script>
import emptyLayout from './layouts/emptyLayout';
import mainLayout from './layouts/mainLayout';

export default {
  metaInfo: {
    title: 'App',
  },
  components: {
    emptyLayout,
    mainLayout,
  },
  computed: {
    layout() {
      return `${this.$route.meta.layout ?? 'empty'}-layout` || 'empty-layout';
    },
  },
};
</script>
<style>

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
@import "assets/css/bootstrap-grid.min.css";

html, body {
  height: 100%;
  margin: 0;
  font-family: 'Roboto', sans-serif;
}

#app {
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #F2F2F2;
  margin: 0;
}
</style>
