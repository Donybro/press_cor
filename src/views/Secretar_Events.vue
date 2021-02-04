<template>
  <div class=''>
    <Events_Header @search-text='pushSearchText' />
    <Events_Container :search-text='searchText' />
  </div>
</template>

<script>
import Events_Header from '../components/Events_Header';
import Events_Container from './Events_Container';

export default {
  name: 'Secretar_Events',
  components: { Events_Container, Events_Header },
  data() {
    return {
      searchText: '',
    };
  },
  methods: {
    pushSearchText(text) {
      this.searchText = text;
    },
  },
};
</script>

<style scoped>

</style>