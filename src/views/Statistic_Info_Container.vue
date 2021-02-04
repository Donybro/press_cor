<template>
  <div class=''>
    <Spinner class='organizationsList row' v-if='loading' size='large' line-fg-color='rgba(0, 88, 191, 0.5)' />
    <Statistic_Info v-else :eventInfo='eventInfo' :guests='guests' :eventType='eventType' :eventId='eventId' />
  </div>
</template>

<script>
import Statistic_Info from './Statistic_Info';
import Http from '../common/Http';
import Spinner from 'vue-simple-spinner';

export default {
  name: 'Static_Info_Container',
  components: { Statistic_Info, Spinner },
  data() {
    return {
      eventType: '',
      eventInfo: [],
      eventId: '',
      loading: true,
      guests: [],
      paginationListLength: 1,
    };
  },
  methods: {
    async fetchEventInfo() {
      this.loading = true;
      this.eventInfo = (await Http.get('api/event/' + this.eventId)).data.object;
      let req = (await Http.get('api/event/statistics/' + this.eventId)).data.object;
      this.eventInfo.visitorsCount = req.visitorsCount;
      this.paginationListLength = req.joinedJournalists.totalPages;
      this.guests = req.joinedJournalists.content;
      if (this.eventInfo.id) {
        this.loading = false;
      }
    },
  },
  async mounted() {
    this.eventType = this.$route.params.eventType;
    this.eventId = this.$route.params.eventId;
    await this.fetchEventInfo();
  },
};
</script>

<style scoped>

</style>