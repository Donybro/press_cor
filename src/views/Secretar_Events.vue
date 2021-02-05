<template>
  <div class='wrapper'>
    <Events_Header @search-text='pushSearchText' />
    <Events class='events' :search-text='searchText' />
  </div>
</template>

<script>
import Events_Header from '../components/Events_Header';
import Events from '../views/Events';

export default {
  name: 'Secretar_Events',
  components: { Events, Events_Header },
  data() {
    return {
      searchText: '',
    };
  },
  methods: {
    pushSearchText(text) {
      console.log(text);
      this.searchText = text;
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.events {
  flex-grow: 3;
}
</style>