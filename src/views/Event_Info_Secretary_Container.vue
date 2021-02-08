<template>
  <div>
    <Spinner class="organizationsList row" v-if="loading" size="large" line-fg-color="rgba(0, 88, 191, 0.5)" />
    <Events_Info_Secretary_New v-if='(eventType === "allAfter") && !loading' :event="event" :event-id="eventId" />
    <Event_Info_Secretary_Last v-if='(eventType === "allBefore") && !loading' :event="event" />
  </div>
</template>

<script>
import Events_Info_Secretary_New from './Events_Info_Secretary_New';
import Http from '../common/Http';
import Event_Info_Secretary_Last from './Event_Info_Secretary_Last';
import Spinner from 'vue-simple-spinner';

export default {
  name: 'Event_Info_Secretary_Container',
  components: { Spinner, Event_Info_Secretary_Last, Events_Info_Secretary_New },
  data() {
    return {
      event: {},
      loading: true,
      eventId: '',
      eventType: '',
    };
  },
  methods: {
    async getEventInfo() {
      this.loading = true;
      this.event = (await Http.get('api/event/' + this.eventId)).data.object;
      if (this.event.name) {
        this.loading = false;
      }
    },
  },
  async mounted() {
    this.eventId = this.$route.params.eventId;
    this.eventType = this.$route.params.eventType;
    await this.getEventInfo();
  },
};
</script>

<style scoped>

</style>