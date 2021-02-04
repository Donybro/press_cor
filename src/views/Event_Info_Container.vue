<template>
  <div class=''>
    <Spinner class='spinnerWrapper' v-if='loading' size='large' line-fg-color='rgba(0, 88, 191, 0.5)' />
    <Event_Info v-else :type='type' :event='event' />
  </div>

</template>

<script>
import Event_Info from './Event_Info';
import Http from '../common/Http';
import Spinner from 'vue-simple-spinner';

export default {
  name: 'Event_Info_Container',
  components: { Event_Info, Spinner },
  data() {
    return {
      event: {},
      type: '',
      loading: true,
    };
  },
  watch: {
    event: {
      immediate: true,
      handler(event) {
        if (event.name) {
          this.loading = false;
        }
      },
    },
  },
  async mounted() {
    const id = this.$route.params.eventId;
    this.type = this.$route.params.eventType;
    this.event = (await Http.get('api/event/' + id)).data.object;

  },
};
</script>

<style scoped>
.spinnerWrapper {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>