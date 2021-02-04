<template>
  <Events role='journalist' :search-text='searchText' />
</template>

<script>
import Events from './Events';

export default {
  name: 'Events_Container',
  props: ['searchText'],
  components: { Events },
  data() {
    return {};
  },
};
</script>

<style scoped>

</style>